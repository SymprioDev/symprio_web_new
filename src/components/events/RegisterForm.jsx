import React, { useEffect, useMemo, useState } from 'react';
import { fetchAdminEvents, getUpcomingEvents } from '../../data/events';

// Update this webhook URL to your Google Form, Airtable, or n8n endpoint when ready.
const EVENTS_WEBHOOK_URL = '';

const sourceOptions = ['LinkedIn', 'WhatsApp', 'Friend', 'Other'];

export default function RegisterForm({ initialEventSlug = '', onSuccess, compact = false }) {
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const adminEvents = await fetchAdminEvents();
        setEvents(adminEvents);
      } catch (error) {
        console.error('Failed to load events for registration:', error);
        setEvents([]);
      } finally {
        setLoadingEvents(false);
      }
    };

    loadEvents();
  }, []);

  const eventOptions = useMemo(() => {
    const upcoming = getUpcomingEvents(events);
    return upcoming.length > 0 ? upcoming : events;
  }, [events]);

  useEffect(() => {
    if (!eventOptions.length) return;

    const matchingEvent = eventOptions.find((option) => option.slug === formData.eventSlug);
    if (!matchingEvent) {
      setFormData((prev) => ({
        ...prev,
        eventSlug: initialEventSlug || eventOptions[0]?.slug || ''
      }));
    }
  }, [eventOptions, formData.eventSlug, initialEventSlug]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organisation: '',
    eventSlug: initialEventSlug || eventOptions[0]?.slug || '',
    heardFrom: '',
    interestedInSpeaking: 'No'
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      if (EVENTS_WEBHOOK_URL) {
        const response = await fetch(EVENTS_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Unable to complete your registration right now.');
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 700));
      }

      const message = `You're registered! We'll send a confirmation to ${formData.email}.`;
      setSuccessMessage(message);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        organisation: '',
        eventSlug: initialEventSlug || eventOptions[0]?.slug || '',
        heardFrom: '',
        interestedInSpeaking: 'No'
      });

      if (onSuccess) {
        onSuccess(message);
      }
    } catch (error) {
      setErrorMessage(error.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`rounded-[2rem] border border-slate-200 bg-white ${compact ? 'p-6' : 'p-8 md:p-10'} shadow-[0_16px_50px_rgba(10,45,110,0.08)]`}>
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#185ADB]">Register</p>
        <h2 className="mt-3 text-3xl font-semibold text-[#0A2D6E]">Reserve your spot</h2>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Join the community for hands-on sessions, conversations, and recordings from upcoming events.
        </p>
      </div>

      {successMessage ? (
        <div className="rounded-[1.6rem] border border-emerald-200 bg-emerald-50 px-5 py-5 text-emerald-800">
          <p className="font-semibold">{successMessage}</p>
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

          <FormField label="Which event are you registering for?" required>
            <select
              value={formData.eventSlug}
              onChange={(e) => handleChange('eventSlug', e.target.value)}
              required
              disabled={loadingEvents || eventOptions.length === 0}
              className={inputClassName}
            >
              {eventOptions.length === 0 && <option value="">No events available</option>}
              {eventOptions.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.title}
                </option>
              ))}
            </select>
          </FormField>

          <div className="grid gap-5 md:grid-cols-2">
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
            <FormField label="Interested in speaking at a future event?">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                {['Yes', 'No'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleChange('interestedInSpeaking', option)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      formData.interestedInSpeaking === option
                        ? 'bg-[#0A2D6E] text-white'
                        : 'bg-white text-slate-600'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </FormField>
          </div>

          {errorMessage && (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-full bg-[#0A2D6E] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#185ADB] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? 'Submitting...' : 'Complete Registration'}
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
