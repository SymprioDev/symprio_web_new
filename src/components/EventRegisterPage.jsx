import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import RegisterForm from './events/RegisterForm';
import TrainingRegisterForm from './events/TrainingRegisterForm';

export default function EventRegisterPage() {
  const [searchParams] = useSearchParams();
  const eventSlug = searchParams.get('event') || '';
  const trainingId = searchParams.get('training') || '';
  const isTrainingRegistration = Boolean(trainingId);

  return (
    <>
      <Helmet>
        <title>Events — Isai Alai Community</title>
        <meta
          name="description"
          content="Join UiPath Malaysia Chapter, Claude Malaysia Chapter, and Students AI Workshops hosted by Isai Alai in Kuala Lumpur."
        />
        <meta property="og:title" content="Isai Alai Community Events" />
        <meta property="og:image" content="/og-events.png" />
      </Helmet>

      <div className="bg-[#F7FAFD] min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#185ADB]">
              {isTrainingRegistration ? 'Training Registration' : 'Events Registration'}
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl font-semibold text-[#0A2D6E]">
              {isTrainingRegistration ? 'Register for an upcoming training' : 'Register for an upcoming event'}
            </h1>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Complete the form below and we'll send your confirmation details by email.
            </p>
          </div>
          {isTrainingRegistration ? (
            <TrainingRegisterForm initialTrainingId={trainingId} />
          ) : (
            <RegisterForm initialEventSlug={eventSlug} />
          )}
        </div>
      </div>
    </>
  );
}
