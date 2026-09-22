import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight, ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  GOOGLE FORM CONFIG                                                 */
/* ------------------------------------------------------------------ */
const GOOGLE_FORM_ID = '1ouURjbq7YNLWd8s3OMVAhpHULOaW8BX1XqbH7EAnFsc';
const GOOGLE_FORM_ACTION = `https://docs.google.com/forms/d/${GOOGLE_FORM_ID}/formResponse`;


// One number per SECTION in your Google Form (0 = first section).
// 7 sections -> '0,1,2,3,4,5,6'. Single-page form -> '0'.
const PAGE_HISTORY = '0,1,2,3,4,5,6';

// Set true while testing: logs a URL you can open in a browser tab to see
// whether Google accepts the answers ("Your response has been recorded")
// or rejects one ("Invalid answer" shown on the offending question).
const DEBUG_SUBMIT = true;

// Must match the checkbox option text in the Google Form EXACTLY.
const DECLARATION_TEXT =
  'I confirm the information provided is true and can be used for evaluation.';

/* ------------------------------------------------------------------ */

interface FormData {
  // Step 1: Applicant
  name: string;
  mobile: string;
  email: string;
  city: string;
  state: string;
  stateOther: string;

  // Step 2: Profile
  currentWork: string;
  existingBusiness: string;
  retailExp: string;
  brief: string;

  // Step 3: Investment
  storeFormat: string;
  investmentSources: string[];
  investOther: string;

  // Step 4: City & Property
  prefCity: string;
  hasProperty: string;
  propertySize: string;
  sizeOther: string;

  // Step 5: Timeline & Intent
  timeline: string;
  comments: string;

  // Step 6: Declaration
  declaration: boolean;
}

const initialFormData: FormData = {
  name: '',
  mobile: '',
  email: '',
  city: '',
  state: '',
  stateOther: '',
  currentWork: '',
  existingBusiness: '',
  retailExp: '',
  brief: '',
  storeFormat: '',
  investmentSources: [],
  investOther: '',
  prefCity: '',
  hasProperty: '',
  propertySize: '',
  sizeOther: '',
  timeline: '',
  comments: '',
  declaration: false,
};

// `value` MUST be copied character-for-character from the Google Form option
// (spaces, "|", "–" vs "-", "—" all matter). If one doesn't match, Google
// silently rejects the whole response.
const STORE_FORMATS = [
  {
    value: 'Skyblue Explore | 3000 sq.ft. | ₹ 3.75 Cr - ₹4.00 Cr',
    title: 'Skyblue Explore',
    size: '3,000 sq. ft.',
    price: '₹3.75 Cr – ₹4.00 Cr',
    tag: 'Flagship Destination',
  },
  {
    value: 'Skyblue Extend | 2000 sq.ft  |  ₹2.5 Cr  - ₹2.65 Cr',
    title: 'Skyblue Extend',
    size: '2,000 sq. ft.',
    price: '₹2.5 Cr – ₹2.65 Cr',
    tag: 'Full Spectrum Store',
  },
  {
    value: 'Skyblue Express| 1,000 sq. ft. | ₹1.25 Cr – ₹1.35 Cr',
    title: 'Skyblue Express',
    size: '1,000 sq. ft.',
    price: '₹1.25 Cr – ₹1.35 Cr',
    tag: 'High Footfall Hub',
  },
  {
    value: 'SBGO –PLUS — 1,000–1,500 sq. ft. | ₹65 Lakh onwards',
    title: 'SBGO Plus',
    size: '1,000–1,500 sq. ft.',
    price: '₹65 Lakh onwards',
    tag: 'Large Neighbourhood',
  },
  {
    value: 'SBGO – STANDARD — 750–999 sq. ft. | ₹45 Lakh – ₹60 Lakh',
    title: 'SBGO Standard',
    size: '750–999 sq. ft.',
    price: '₹45 – ₹60 Lakh',
    tag: 'Core City Store',
  },
  {
    value: 'SBGO – COMPACT — 500–749 sq. ft. | ₹30 Lakh – ₹45 Lakh',
    title: 'SBGO Compact',
    size: '500–749 sq. ft.',
    price: '₹30 – ₹45 Lakh',
    tag: 'Smart Urban Store',
  },
];

const STEPS = [
  { id: 1, title: 'Applicant details', subtitle: 'Tell us about yourself' },
  { id: 2, title: 'Your profile', subtitle: 'Background & experience' },
  { id: 3, title: 'Investment plan', subtitle: 'Store format & budget' },
  { id: 4, title: 'City and property', subtitle: 'Location & premises' },
  { id: 5, title: 'Timeline & intent', subtitle: 'Project schedule' },
  { id: 6, title: 'Declaration', subtitle: 'Review & confirmation' },
];

/* ------------------------------------------------------------------ */
/*  Build the Google Form payload                                      */
/* ------------------------------------------------------------------ */
function buildGooglePayload(f: FormData): URLSearchParams {
  const data = new URLSearchParams();

  // Applicant
  data.append('entry.1985841947', f.name.trim());
  data.append('entry.1018692279', f.mobile.trim());
  data.append('entry.688673488', f.email.trim());
  data.append('entry.1588589796', f.city.trim());

  // State (radio with "Other")
  data.append('entry.1938531473', f.state);
  if (f.state === '__other_option__') {
    data.append('entry.1938531473.other_option_response', f.stateOther.trim());
  }

  // Profile
  data.append('entry.607449899', f.currentWork);
  data.append('entry.210761404', f.existingBusiness);
  data.append('entry.739312461', f.retailExp);
  data.append('entry.1925592945', f.brief.trim());

  // Investment
  data.append('entry.1560005807', f.storeFormat);
  f.investmentSources.forEach((src) => data.append('entry.949691492', src));
  if (f.investmentSources.includes('__other_option__')) {
    data.append('entry.949691492.other_option_response', f.investOther.trim());
  }

  // City & property
  data.append('entry.1164411568', f.prefCity.trim());
  data.append('entry.1795875279', f.hasProperty);
  if (f.propertySize) {
    data.append('entry.1490733671', f.propertySize);
    if (f.propertySize === '__other_option__') {
      data.append('entry.1490733671.other_option_response', f.sizeOther.trim());
    }
  }

  // Timeline & comments
  data.append('entry.2001593340', f.timeline);
  if (f.comments.trim()) {
    data.append('entry.1763980886', f.comments.trim());
  }

  // Declaration
  if (f.declaration) {
    data.append('entry.1253328926', DECLARATION_TEXT);
  }

  // Required if the form has "Collect email addresses" = "Responder input".
  // Harmless if email collection is off.
  data.append('emailAddress', f.email.trim());

  // Needed for multi-section forms
  data.append('fvv', '1');
  data.append('pageHistory', PAGE_HISTORY);

  return data;
}

/* ------------------------------------------------------------------ */
/*  Submit via hidden iframe + real <form> POST                        */
/*  More reliable than fetch(no-cors): no CORS/preflight issues, no    */
/*  ad-blocker fetch blocking, and the browser handles redirects.      */
/* ------------------------------------------------------------------ */
function submitToGoogleForm(payload: URLSearchParams): Promise<void> {
  return new Promise((resolve, reject) => {
    const iframeName = `gform-target-${Date.now()}`;

    const iframe = document.createElement('iframe');
    iframe.name = iframeName;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = GOOGLE_FORM_ACTION;
    form.target = iframeName;
    form.style.display = 'none';

    payload.forEach((value, key) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);

    let finished = false;
    const cleanup = () => {
      setTimeout(() => {
        form.remove();
        iframe.remove();
      }, 1000);
    };

    iframe.addEventListener('load', () => {
      if (finished) return;
      finished = true;
      cleanup();
      resolve();
    });

    // Safety timeout in case the load event never fires
    setTimeout(() => {
      if (finished) return;
      finished = true;
      cleanup();
      if (navigator.onLine) resolve();
      else reject(new Error('offline'));
    }, 10000);

    try {
      form.submit();
    } catch (err) {
      finished = true;
      cleanup();
      reject(err);
    }
  });
}

export function FranchiseForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (stepIndex: number): boolean => {
    const errs: Record<string, string> = {};

    if (stepIndex === 0) {
      if (!formData.name.trim()) errs.name = 'Please enter your full name.';
      if (!formData.mobile.trim()) {
        errs.mobile = 'Enter your 10-digit mobile number.';
      } else if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
        errs.mobile = 'Enter a valid 10-digit Indian mobile number (starts with 6-9).';
      }
      if (!formData.email.trim()) {
        errs.email = 'Please enter your email address.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email address.';
      }
      if (!formData.city.trim()) errs.city = 'Please enter your city of residence.';
      if (!formData.state) {
        errs.state = 'Please select your state.';
      } else if (formData.state === '__other_option__' && !formData.stateOther.trim()) {
        errs.stateOther = 'Please type your state.';
      }
    } else if (stepIndex === 1) {
      if (!formData.currentWork) errs.currentWork = 'Please choose your current work profile.';
      if (!formData.existingBusiness) errs.existingBusiness = 'Please select whether you have an existing business.';
      if (!formData.retailExp) errs.retailExp = 'Please select whether you have retail/franchise experience.';
      if (!formData.brief.trim()) errs.brief = 'Please provide a brief summary of your work or business.';
    } else if (stepIndex === 2) {
      if (!formData.storeFormat) errs.storeFormat = 'Please select a preferred store format.';
      if (formData.investmentSources.length === 0) {
        errs.investmentSources = 'Please select at least one source of investment.';
      } else if (formData.investmentSources.includes('__other_option__') && !formData.investOther.trim()) {
        errs.investOther = 'Please specify your other investment source.';
      }
    } else if (stepIndex === 3) {
      if (!formData.prefCity.trim()) errs.prefCity = 'Please enter your preferred franchise city.';
      if (!formData.hasProperty) errs.hasProperty = 'Please tell us if you have or identified a property.';
      if (formData.propertySize === '__other_option__' && !formData.sizeOther.trim()) {
        errs.sizeOther = 'Please enter the property size.';
      }
    } else if (stepIndex === 4) {
      if (!formData.timeline) errs.timeline = 'Please select your target timeline.';
    } else if (stepIndex === 5) {
      if (!formData.declaration) {
        errs.declaration = 'Please confirm the declaration to submit your application.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1);
        const formContainer = document.getElementById('franchise-form-container');
        if (formContainer) {
          formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleCheckboxToggle = (value: string) => {
    clearError('investmentSources');
    setFormData((prev) => {
      const exists = prev.investmentSources.includes(value);
      const updated = exists
        ? prev.investmentSources.filter((v) => v !== value)
        : [...prev.investmentSources, value];
      return { ...prev, investmentSources: updated };
    });
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = buildGooglePayload(formData);

    if (DEBUG_SUBMIT) {
      // Open this URL in a new tab to see if Google accepts the answers.
      // eslint-disable-next-line no-console
      console.log('[FranchiseForm] Test URL:\n' + `${GOOGLE_FORM_ACTION}?${payload.toString()}`);
    }

    try {
      await submitToGoogleForm(payload);
      setIsSubmitted(true);
    } catch {
      setSubmitError('Unable to send application right now. Please check your connection or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(0);
    setIsSubmitted(false);
    setErrors({});
    setSubmitError(null);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white border border-gray-200 p-8 sm:p-12 shadow-sm text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center bg-green-50 text-green-600 border border-green-200">
          <CheckCircle2 size={42} />
        </div>
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-sb-yellow text-black text-xs font-bold uppercase tracking-wider">
          <Sparkles size={14} /> Application Submitted
        </div>
        <h2 className="mb-4 text-3xl sm:text-4xl font-black tracking-tight text-black">
          Thank you, {formData.name || 'Partner'}!
        </h2>
        <p className="mx-auto max-w-xl text-base sm:text-lg text-gray-700 leading-relaxed mb-8">
          Thank you for your interest in partnering with SBGO. Our team reviews every application thoroughly and will contact shortlisted applicants on email and WhatsApp.
        </p>

        <div className="mx-auto max-w-md bg-gray-50 border border-gray-200 p-6 text-left mb-8 space-y-2 text-sm text-gray-700">
          <div className="font-bold text-black border-b border-gray-200 pb-2">Application Summary:</div>
          <div><span className="font-medium text-gray-500">Name:</span> {formData.name}</div>
          <div><span className="font-medium text-gray-500">Mobile:</span> {formData.mobile}</div>
          <div><span className="font-medium text-gray-500">Email:</span> {formData.email}</div>
          <div><span className="font-medium text-gray-500">City:</span> {formData.prefCity || formData.city}</div>
        </div>

        <button
          type="button"
          onClick={resetForm}
          className="inline-flex items-center justify-center bg-sb-blue px-7 py-3.5 text-base font-bold text-white transition-all hover:bg-blue-800"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <div id="franchise-form-container" className="bg-white border border-gray-200 p-6 sm:p-10 shadow-sm">
      {/* Header */}
      <header className="mb-8 border-b border-gray-100 pb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-[3px] bg-sb-yellow"></span>
          <span className="text-xs sm:text-sm font-bold tracking-widest text-sb-blue uppercase">
            FRANCHISE ENQUIRY
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-black">
          Bring SB GO to your city.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
          This detailed application helps us understand you, your location and your plans, so our franchise team can assess the fit and come back to you with the right next steps.
        </p>
      </header>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-black mb-2.5">
          <span className="text-sb-blue">
            Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}
          </span>
          <span className="text-gray-500 font-medium">
            {Math.round(((currentStep + 1) / STEPS.length) * 100)}% Completed
          </span>
        </div>

        <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
          {STEPS.map((step, idx) => (
            <div
              key={step.id}
              className={`h-2 transition-all ${
                idx < currentStep
                  ? 'bg-sb-blue'
                  : idx === currentStep
                  ? 'bg-sb-yellow'
                  : 'bg-gray-200'
              }`}
              title={step.title}
            />
          ))}
        </div>
      </div>

      {submitError && (
        <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Form Step Body */}
      <form onSubmit={(e) => e.preventDefault()} noValidate>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* STEP 1: Applicant Details */}
            {currentStep === 0 && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-3 mb-4">
                  <h3 className="text-lg font-bold text-black">1. Applicant Details</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Provide your personal contact details</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-1.5" htmlFor="field-name">
                    Full name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="field-name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      clearError('name');
                    }}
                    placeholder="Enter your full name"
                    className={`w-full border px-4 py-3 text-base text-black bg-white focus:outline-none focus:ring-2 focus:ring-sb-blue/20 transition-all ${
                      errors.name ? 'border-red-500 bg-red-50/20' : 'border-gray-300 focus:border-sb-blue'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-red-600 font-semibold mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-black mb-1.5" htmlFor="field-mobile">
                      Mobile number <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3.5 text-sm font-semibold text-gray-500">+91</span>
                      <input
                        type="tel"
                        id="field-mobile"
                        maxLength={10}
                        inputMode="numeric"
                        value={formData.mobile}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          setFormData({ ...formData, mobile: val });
                          clearError('mobile');
                        }}
                        placeholder="9876543210"
                        className={`w-full border pl-12 pr-4 py-3 text-base text-black bg-white focus:outline-none focus:ring-2 focus:ring-sb-blue/20 transition-all ${
                          errors.mobile ? 'border-red-500 bg-red-50/20' : 'border-gray-300 focus:border-sb-blue'
                        }`}
                      />
                    </div>
                    {errors.mobile && <p className="text-xs text-red-600 font-semibold mt-1">{errors.mobile}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black mb-1.5" htmlFor="field-email">
                      Email ID <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="field-email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        clearError('email');
                      }}
                      placeholder="name@example.com"
                      className={`w-full border px-4 py-3 text-base text-black bg-white focus:outline-none focus:ring-2 focus:ring-sb-blue/20 transition-all ${
                        errors.email ? 'border-red-500 bg-red-50/20' : 'border-gray-300 focus:border-sb-blue'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-600 font-semibold mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-1.5" htmlFor="field-city">
                    City of residence <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="field-city"
                    value={formData.city}
                    onChange={(e) => {
                      setFormData({ ...formData, city: e.target.value });
                      clearError('city');
                    }}
                    placeholder="e.g. Ahmedabad, Surat, Rajkot"
                    className={`w-full border px-4 py-3 text-base text-black bg-white focus:outline-none focus:ring-2 focus:ring-sb-blue/20 transition-all ${
                      errors.city ? 'border-red-500 bg-red-50/20' : 'border-gray-300 focus:border-sb-blue'
                    }`}
                  />
                  {errors.city && <p className="text-xs text-red-600 font-semibold mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    State <span className="text-red-600">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {['Gujarat', 'Rajasthan', 'MP', 'Maharashtra', '__other_option__'].map((st) => (
                      <label
                        key={st}
                        className={`flex items-center gap-2.5 p-3 border cursor-pointer transition-all ${
                          formData.state === st
                            ? 'border-sb-blue bg-blue-50/50 font-bold text-black'
                            : 'border-gray-200 hover:border-gray-400 bg-white text-gray-800'
                        }`}
                      >
                        <input
                          type="radio"
                          name="state"
                          checked={formData.state === st}
                          onChange={() => {
                            setFormData({ ...formData, state: st });
                            clearError('state');
                          }}
                          className="text-sb-blue focus:ring-sb-blue"
                        />
                        <span className="text-sm">{st === '__other_option__' ? 'Other' : st}</span>
                      </label>
                    ))}
                  </div>
                  {errors.state && <p className="text-xs text-red-600 font-semibold mt-1">{errors.state}</p>}

                  {formData.state === '__other_option__' && (
                    <div className="mt-3">
                      <input
                        type="text"
                        value={formData.stateOther}
                        onChange={(e) => {
                          setFormData({ ...formData, stateOther: e.target.value });
                          clearError('stateOther');
                        }}
                        placeholder="Type your state"
                        className="w-full border border-gray-300 px-4 py-2.5 text-sm text-black focus:border-sb-blue focus:outline-none"
                      />
                      {errors.stateOther && (
                        <p className="text-xs text-red-600 font-semibold mt-1">{errors.stateOther}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 2: Profile */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-3 mb-4">
                  <h3 className="text-lg font-bold text-black">2. Your Profile</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Your background and operational experience</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Current work <span className="text-red-600">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      'Salaried',
                      'Govt. Employee',
                      'Business Owner',
                      'Professional',
                      'Homemaker',
                      'New Business Entrant',
                    ].map((work) => (
                      <label
                        key={work}
                        className={`flex items-center gap-2.5 p-3 border cursor-pointer transition-all ${
                          formData.currentWork === work
                            ? 'border-sb-blue bg-blue-50/50 font-bold text-black'
                            : 'border-gray-200 hover:border-gray-400 bg-white text-gray-800'
                        }`}
                      >
                        <input
                          type="radio"
                          name="currentWork"
                          checked={formData.currentWork === work}
                          onChange={() => {
                            setFormData({ ...formData, currentWork: work });
                            clearError('currentWork');
                          }}
                          className="text-sb-blue focus:ring-sb-blue"
                        />
                        <span className="text-sm">{work}</span>
                      </label>
                    ))}
                  </div>
                  {errors.currentWork && (
                    <p className="text-xs text-red-600 font-semibold mt-1">{errors.currentWork}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Do you have an existing business? <span className="text-red-600">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {['Yes', 'No'].map((ans) => (
                        <label
                          key={ans}
                          className={`flex items-center justify-center gap-2 p-3 border cursor-pointer transition-all ${
                            formData.existingBusiness === ans
                              ? 'border-sb-blue bg-blue-50/50 font-bold text-black'
                              : 'border-gray-200 hover:border-gray-400 bg-white text-gray-800'
                          }`}
                        >
                          <input
                            type="radio"
                            name="existingBusiness"
                            checked={formData.existingBusiness === ans}
                            onChange={() => {
                              setFormData({ ...formData, existingBusiness: ans });
                              clearError('existingBusiness');
                            }}
                            className="text-sb-blue focus:ring-sb-blue"
                          />
                          <span className="text-sm">{ans}</span>
                        </label>
                      ))}
                    </div>
                    {errors.existingBusiness && (
                      <p className="text-xs text-red-600 font-semibold mt-1">{errors.existingBusiness}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Retail or franchise experience? <span className="text-red-600">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {['Yes', 'No'].map((ans) => (
                        <label
                          key={ans}
                          className={`flex items-center justify-center gap-2 p-3 border cursor-pointer transition-all ${
                            formData.retailExp === ans
                              ? 'border-sb-blue bg-blue-50/50 font-bold text-black'
                              : 'border-gray-200 hover:border-gray-400 bg-white text-gray-800'
                          }`}
                        >
                          <input
                            type="radio"
                            name="retailExp"
                            checked={formData.retailExp === ans}
                            onChange={() => {
                              setFormData({ ...formData, retailExp: ans });
                              clearError('retailExp');
                            }}
                            className="text-sb-blue focus:ring-sb-blue"
                          />
                          <span className="text-sm">{ans}</span>
                        </label>
                      ))}
                    </div>
                    {errors.retailExp && (
                      <p className="text-xs text-red-600 font-semibold mt-1">{errors.retailExp}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-1.5" htmlFor="field-brief">
                    Brief about your current work or business <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="field-brief"
                    rows={3}
                    value={formData.brief}
                    onChange={(e) => {
                      setFormData({ ...formData, brief: e.target.value });
                      clearError('brief');
                    }}
                    placeholder="Tell us a little about your professional background, current ventures, or business experience..."
                    className={`w-full border px-4 py-3 text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-sb-blue/20 transition-all ${
                      errors.brief ? 'border-red-500 bg-red-50/20' : 'border-gray-300 focus:border-sb-blue'
                    }`}
                  />
                  {errors.brief && <p className="text-xs text-red-600 font-semibold mt-1">{errors.brief}</p>}
                </div>
              </div>
            )}

            {/* STEP 3: Investment */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-3 mb-4">
                  <h3 className="text-lg font-bold text-black">3. Investment Plan</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Store format selection and funding source</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Which store format are you planning? <span className="text-red-600">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {STORE_FORMATS.map((fmt) => (
                      <label
                        key={fmt.value}
                        className={`relative p-4 border cursor-pointer transition-all flex flex-col justify-between ${
                          formData.storeFormat === fmt.value
                            ? 'border-sb-blue bg-blue-50/60 shadow-xs'
                            : 'border-gray-200 hover:border-gray-400 bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="storeFormat"
                              checked={formData.storeFormat === fmt.value}
                              onChange={() => {
                                setFormData({ ...formData, storeFormat: fmt.value });
                                clearError('storeFormat');
                              }}
                              className="text-sb-blue focus:ring-sb-blue mt-0.5"
                            />
                            <span className="font-extrabold text-black text-base">{fmt.title}</span>
                          </div>
                          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 bg-gray-100 text-gray-700">
                            {fmt.size}
                          </span>
                        </div>
                        <div className="pl-6 flex items-center justify-between">
                          <span className="text-sm font-bold text-sb-blue">{fmt.price}</span>
                          <span className="text-xs text-gray-500">{fmt.tag}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.storeFormat && (
                    <p className="text-xs text-red-600 font-semibold mt-1.5">{errors.storeFormat}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-1">
                    Source of investment <span className="text-red-600">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mb-2.5">Choose all that apply</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {['Own', 'Family', 'Bank Loan', 'Partner', '__other_option__'].map((src) => (
                      <label
                        key={src}
                        className={`flex items-center gap-2.5 p-3 border cursor-pointer transition-all ${
                          formData.investmentSources.includes(src)
                            ? 'border-sb-blue bg-blue-50/50 font-bold text-black'
                            : 'border-gray-200 hover:border-gray-400 bg-white text-gray-800'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.investmentSources.includes(src)}
                          onChange={() => handleCheckboxToggle(src)}
                          className="text-sb-blue focus:ring-sb-blue rounded"
                        />
                        <span className="text-sm">{src === '__other_option__' ? 'Other source' : src}</span>
                      </label>
                    ))}
                  </div>
                  {errors.investmentSources && (
                    <p className="text-xs text-red-600 font-semibold mt-1">{errors.investmentSources}</p>
                  )}

                  {formData.investmentSources.includes('__other_option__') && (
                    <div className="mt-3">
                      <input
                        type="text"
                        value={formData.investOther}
                        onChange={(e) => {
                          setFormData({ ...formData, investOther: e.target.value });
                          clearError('investOther');
                        }}
                        placeholder="Specify other investment source"
                        className="w-full border border-gray-300 px-4 py-2.5 text-sm text-black focus:border-sb-blue focus:outline-none"
                      />
                      {errors.investOther && (
                        <p className="text-xs text-red-600 font-semibold mt-1">{errors.investOther}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 4: City & Property */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-3 mb-4">
                  <h3 className="text-lg font-bold text-black">4. City and Property</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Target city and real estate readiness</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-1.5" htmlFor="field-prefCity">
                    Preferred franchise city <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="field-prefCity"
                    value={formData.prefCity}
                    onChange={(e) => {
                      setFormData({ ...formData, prefCity: e.target.value });
                      clearError('prefCity');
                    }}
                    placeholder="Where do you want to open your store?"
                    className={`w-full border px-4 py-3 text-base text-black bg-white focus:outline-none focus:ring-2 focus:ring-sb-blue/20 transition-all ${
                      errors.prefCity ? 'border-red-500 bg-red-50/20' : 'border-gray-300 focus:border-sb-blue'
                    }`}
                  />
                  {errors.prefCity && <p className="text-xs text-red-600 font-semibold mt-1">{errors.prefCity}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Do you have a property? <span className="text-red-600">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {['Own', 'Identified', 'Need support', 'Not yet'].map((prop) => (
                      <label
                        key={prop}
                        className={`flex items-center gap-2 p-3 border cursor-pointer transition-all ${
                          formData.hasProperty === prop
                            ? 'border-sb-blue bg-blue-50/50 font-bold text-black'
                            : 'border-gray-200 hover:border-gray-400 bg-white text-gray-800'
                        }`}
                      >
                        <input
                          type="radio"
                          name="hasProperty"
                          checked={formData.hasProperty === prop}
                          onChange={() => {
                            setFormData({ ...formData, hasProperty: prop });
                            clearError('hasProperty');
                          }}
                          className="text-sb-blue focus:ring-sb-blue"
                        />
                        <span className="text-sm">{prop}</span>
                      </label>
                    ))}
                  </div>
                  {errors.hasProperty && (
                    <p className="text-xs text-red-600 font-semibold mt-1">{errors.hasProperty}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Approx. property size in sq. ft. <span className="text-gray-500 font-normal">(if available)</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {['500-749', '750-999', '1000-2000', '__other_option__'].map((sz) => (
                      <label
                        key={sz}
                        className={`flex items-center gap-2 p-3 border cursor-pointer transition-all ${
                          formData.propertySize === sz
                            ? 'border-sb-blue bg-blue-50/50 font-bold text-black'
                            : 'border-gray-200 hover:border-gray-400 bg-white text-gray-800'
                        }`}
                      >
                        <input
                          type="radio"
                          name="propertySize"
                          checked={formData.propertySize === sz}
                          onChange={() => {
                            setFormData({ ...formData, propertySize: sz });
                            clearError('sizeOther');
                          }}
                          className="text-sb-blue focus:ring-sb-blue"
                        />
                        <span className="text-sm">{sz === '__other_option__' ? 'Other' : sz}</span>
                      </label>
                    ))}
                  </div>

                  {formData.propertySize === '__other_option__' && (
                    <div className="mt-3">
                      <input
                        type="text"
                        value={formData.sizeOther}
                        onChange={(e) => {
                          setFormData({ ...formData, sizeOther: e.target.value });
                          clearError('sizeOther');
                        }}
                        placeholder="Size in sq. ft."
                        className="w-full border border-gray-300 px-4 py-2.5 text-sm text-black focus:border-sb-blue focus:outline-none"
                      />
                      {errors.sizeOther && (
                        <p className="text-xs text-red-600 font-semibold mt-1">{errors.sizeOther}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 5: Timeline & Comments */}
            {currentStep === 4 && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-3 mb-4">
                  <h3 className="text-lg font-bold text-black">5. Timeline &amp; Additional Notes</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Your planned start window and extra information</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    When do you plan to start? <span className="text-red-600">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['0-3 months', '3-6 months'].map((time) => (
                      <label
                        key={time}
                        className={`flex items-center gap-3 p-4 border cursor-pointer transition-all ${
                          formData.timeline === time
                            ? 'border-sb-blue bg-blue-50/50 font-bold text-black'
                            : 'border-gray-200 hover:border-gray-400 bg-white text-gray-800'
                        }`}
                      >
                        <input
                          type="radio"
                          name="timeline"
                          checked={formData.timeline === time}
                          onChange={() => {
                            setFormData({ ...formData, timeline: time });
                            clearError('timeline');
                          }}
                          className="text-sb-blue focus:ring-sb-blue"
                        />
                        <div>
                          <div className="text-base font-bold text-black">{time}</div>
                          <div className="text-xs text-gray-500">
                            {time === '0-3 months' ? 'Immediate priority launch' : 'Medium term planning'}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.timeline && (
                    <p className="text-xs text-red-600 font-semibold mt-1">{errors.timeline}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-1.5" htmlFor="field-comments">
                    Additional comments <span className="text-gray-500 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="field-comments"
                    rows={4}
                    value={formData.comments}
                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                    placeholder="Anything else we should know about your location preferences, expectations, or partnership vision..."
                    className="w-full border border-gray-300 px-4 py-3 text-sm text-black bg-white focus:border-sb-blue focus:outline-none focus:ring-2 focus:ring-sb-blue/20 transition-all"
                  />
                </div>
              </div>
            )}

            {/* STEP 6: Declaration */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-3 mb-4">
                  <h3 className="text-lg font-bold text-black">6. Declaration &amp; Submission</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Confirm your details before sending</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-5 space-y-3 text-sm text-gray-800">
                  <div className="font-extrabold text-black text-base border-b border-gray-200 pb-2">
                    Review your application summary
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                    <div><span className="font-semibold text-gray-500">Name:</span> {formData.name}</div>
                    <div><span className="font-semibold text-gray-500">Mobile:</span> +91 {formData.mobile}</div>
                    <div><span className="font-semibold text-gray-500">Email:</span> {formData.email}</div>
                    <div><span className="font-semibold text-gray-500">City / State:</span> {formData.city}, {formData.state === '__other_option__' ? formData.stateOther : formData.state}</div>
                    <div><span className="font-semibold text-gray-500">Format:</span> {formData.storeFormat ? (STORE_FORMATS.find((f) => f.value === formData.storeFormat)?.title ?? formData.storeFormat) : '-'}</div>
                    <div><span className="font-semibold text-gray-500">Target City:</span> {formData.prefCity}</div>
                    <div><span className="font-semibold text-gray-500">Timeline:</span> {formData.timeline}</div>
                    <div><span className="font-semibold text-gray-500">Property:</span> {formData.hasProperty}</div>
                  </div>
                </div>

                <div className="pt-2">
                  <label
                    className={`flex items-start gap-3.5 p-4 border cursor-pointer transition-all ${
                      formData.declaration
                        ? 'border-sb-blue bg-blue-50/50'
                        : 'border-gray-300 hover:border-gray-400 bg-white'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.declaration}
                      onChange={(e) => {
                        setFormData({ ...formData, declaration: e.target.checked });
                        clearError('declaration');
                      }}
                      className="mt-1 text-sb-blue focus:ring-sb-blue rounded"
                    />
                    <span className="text-sm font-semibold text-black leading-relaxed">
                      I confirm the information provided is true and can be used by the SBGO team for franchise evaluation.
                    </span>
                  </label>
                  {errors.declaration && (
                    <p className="text-xs text-red-600 font-semibold mt-2">{errors.declaration}</p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex items-center justify-between gap-4">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-colors disabled:opacity-50"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-base font-extrabold text-black bg-sb-yellow hover:bg-yellow-400 shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting ? (
              <>Sending application…</>
            ) : currentStep === STEPS.length - 1 ? (
              <>
                Send application
                <ArrowRight size={18} />
              </>
            ) : (
              <>
                Next step
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}