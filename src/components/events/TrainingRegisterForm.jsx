import React, { useEffect, useMemo, useState } from 'react';

// Update this webhook URL to your Google Form, Airtable, or n8n endpoint when ready.
const TRAINING_WEBHOOK_URL = '';

const sourceOptions = ['LinkedIn', 'WhatsApp', 'Friend', 'Other'];

export default function TrainingRegisterForm({ initialTrainingId = '', onSuccess, compact = false }) {
  const [trainings, setTrainings] = useState([]);
  const [loadingTrainings, setLoadingTrainings] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organisation: '',
    trainingId: '',
    heardFrom: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadTrainings = async () => {
      try {
        const response = await fetch('/api/trainings');
        if (!response.ok) throw new Error('Failed to load trainings');
        const data = await response.json();
        setTrainings(Array.isArray(data) ? data.filter((training) => !training.link) : []);
      } catch (error) {
        console.error('Failed to load trainings for registration:', error);
        setTrainings([]);
      } finally {
        setLoadingTrainings(false);
      }
    };

    loadTrainings();
  }, []);

  const availableTrainings = useMemo(
    () => trainings.filter((training) => Number(training.registrations_count || 0) < Number(training.capacity || 0)),
    [trainings]
  );

  useEffect(() => {
    if (!availableTrainings.length) return;

    const nextId = availableTrainings.some((training) => String(training.id) === String(initialTrainingId))
      ? String(initialTrainingId)
      : String(availableTrainings[0].id);

    setFormData((prev) => (
      prev.trainingId && availableTrainings.some((training) => String(training.id) === String(prev.trainingId))
        ? prev
        : { ...prev, trainingId: nextId }
    ));
  }, [availableTrainings, initialTrainingId]);

  const selectedTraining = useMemo(
    () => availableTrainings.find((training) => String(training.id) === String(formData.trainingId)),
    [availableTrainings, formData.trainingId]
  );

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      organisation: '',
      trainingId: availableTrainings[0] ? String(availableTrainings[0].id) : '',
      heardFrom: ''
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedTraining) {
      setErrorMessage('No training is currently available for registration.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const registrationPayload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        organisation: formData.organisation,
        heardFrom: formData.heardFrom
      };

      const response = await fetch(`/api/trainings/${selectedTraining.id}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationPayload)
      });

      const responseData = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(responseData.error || 'Unable to complete your training registration right now.');
      }

      if (TRAINING_WEBHOOK_URL) {
        try {
          await fetch(TRAINING_WEBHOOK_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ...registrationPayload,
              trainingId: selectedTraining.id,
              trainingTitle: selectedTraining.title
            })
          });
        } catch (webhookError) {
          console.error('Failed to notify external training registration webhook:', webhookError);
        }
      }

      const remainingText = responseData.remainingSpots == null ? '' : ` Remaining spots: ${responseData.remainingSpots}.`;
      const message = `You're registered for the training! We'll send a confirmation to ${formData.email}.${remainingText}`;
      setSuccessMessage(message);
      resetForm();

      if (onSuccess) {
        onSuccess(message);
      }
    } catch (error) {
      setErrorMessage(error.message || 'Training registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`rounded-[2rem] border border-slate-200 bg-white ${compact ? 'p-6' : 'p-8 md:p-10'} shadow-[0_16px_50px_rgba(10,45,110,0.08)]`}>
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-600">Training Registration</p>
        <h2 className="mt-3 text-3xl font-semibold text-[#0A2D6E]">Reserve your training seat</h2>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Register for an upcoming training session and we’ll share the next steps by email.
        </p>
      </div>

      {successMessage ? (
        <div className="rounded-[1.6rem] border border-emerald-200 bg-emerald-50 px-5 py-5 text-emerald-800">
          <p className="font-semibold">{successMessage}</p>
        </div>
      ) : availableTrainings.length === 0 && !loadingTrainings ? (
        <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50 px-5 py-5 text-slate-700">
          <p className="font-semibold">No trainings are currently open for internal registration.</p>
          <p className="mt-2 text-sm">Trainings with external links or full capacity will not appear here.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Full name" required>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                required
                className={inputClassName}
                placeholder="Your name"
              />
            </FormField>
            <FormField label="Email address" required>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
                className={inputClassName}
                placeholder="you@example.com"
              />
            </FormField>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Phone number">
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={inputClassName}
                placeholder="+60..."
              />
            </FormField>
            <FormField label="Organisation / Company">
              <input
                type="text"
                value={formData.organisation}
                onChange={(e) => handleChange('organisation', e.target.value)}
                className={inputClassName}
                placeholder="Organisation"
              />
            </FormField>
          </div>

          <FormField label="Which training are you registering for?" required>
            <select
              value={formData.trainingId}
              onChange={(e) => handleChange('trainingId', e.target.value)}
              required
              disabled={loadingTrainings || availableTrainings.length === 0}
              className={inputClassName}
            >
              {availableTrainings.length === 0 && <option value="">No trainings available</option>}
              {availableTrainings.map((training) => (
                <option key={training.id} value={training.id}>
                  {training.title}
                </option>
              ))}
            </select>
            {selectedTraining && (
              <p className="mt-2 text-xs text-slate-500">
                Seats available: {Math.max(Number(selectedTraining.capacity || 0) - Number(selectedTraining.registrations_count || 0), 0)}
              </p>
            )}
          </FormField>

          <FormField label="How did you hear about us?">
            <select
              value={formData.heardFrom}
              onChange={(e) => handleChange('heardFrom', e.target.value)}
              className={inputClassName}
            >
              <option value="">Select an option</option>
              {sourceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>

          {errorMessage && (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || loadingTrainings || availableTrainings.length === 0}
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? 'Submitting...' : 'Complete Training Registration'}
          </button>
        </form>
      )}
    </div>
  );
}

function FormField({ label, required = false, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}

const inputClassName =
  'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#185ADB] focus:bg-white focus:ring-4 focus:ring-[#185ADB]/10';
