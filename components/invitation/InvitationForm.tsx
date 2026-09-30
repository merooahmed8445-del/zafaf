'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';
import { StepIndicator } from './StepIndicator';
import { Step1CoupleInfo } from './steps/Step1CoupleInfo';
import { Step2DateTime } from './steps/Step2DateTime';
import { Step3Media } from './steps/Step3Media';
import { Step4Review } from './steps/Step4Review';
import { defaultInvitationData, InvitationFormData } from '@/types/database';
import { Card, CardBody } from '@/components/ui/Card';

const STEPS = [
  { number: 1, title: 'بيانات العروسين', description: 'الاسم والشخصية' },
  { number: 2, title: 'التاريخ والمكان', description: 'موعد الحفل والقاعة' },
  { number: 3, title: 'الصورة والموسيقى', description: 'اللمسات الإبداعية' },
  { number: 4, title: 'المراجعة والنشر', description: 'التأكد والانطلاق' },
];

interface InvitationFormProps {
  userId: string;
  mode?: 'create' | 'edit';
  invitationId?: string;
  initialData?: Partial<InvitationFormData>;
}

export function InvitationForm({
  userId,
  mode = 'create',
  invitationId,
  initialData,
}: InvitationFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<InvitationFormData>({
    ...defaultInvitationData,
    ...initialData,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const isEdit = mode === 'edit';

  function updateFormData(updates: Partial<InvitationFormData>) {
    setFormData((prev) => ({ ...prev, ...updates }));
    const clearedErrors = { ...errors };
    Object.keys(updates).forEach((key) => delete clearedErrors[key]);
    setErrors(clearedErrors);
  }

  function validateStep1(): boolean {
    const newErrors: Record<string, string> = {};

    if (!formData.groom_name.trim()) {
      newErrors.groom_name = 'اسم العريس مطلوب';
    }
    if (!formData.bride_name.trim()) {
      newErrors.bride_name = 'اسم العروسة مطلوب';
    }
    if (!formData.slug.trim()) {
      newErrors.slug = 'رابط الدعوة مطلوب';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'الرابط يجب أن يحتوي على أحرف إنجليزية صغيرة وأرقام وشرطات فقط';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validateStep2(): boolean {
    const newErrors: Record<string, string> = {};

    if (!formData.wedding_date) {
      newErrors.wedding_date = 'تاريخ الزفاف مطلوب';
    }
    if (!formData.venue_name.trim()) {
      newErrors.venue_name = 'اسم القاعة أو الفندق مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function nextStep() {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;

    if (currentStep < STEPS.length) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function goToStep(step: number) {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit(status: 'draft' | 'published') {
    setSubmitError('');
    setSubmitting(true);

    try {
      const supabase = createClient();

      const payload = {
        slug: formData.slug,
        status,
        groom_name: formData.groom_name,
        bride_name: formData.bride_name,
        seal_letters: formData.seal_letters,
        groom_father: formData.groom_father || null,
        bride_father: formData.bride_father || null,
        wedding_date: formData.wedding_date,
        start_time: formData.start_time,
        reception_time: formData.reception_time,
        ceremony_time: formData.ceremony_time,
        timezone: formData.timezone,
        venue_name: formData.venue_name || null,
        venue_address: formData.venue_address || null,
        maps_url: formData.maps_url || null,
        whatsapp_number: formData.whatsapp_number || null,
        photo_url: formData.photo_url || null,
        audio_url: formData.audio_url || null,
        audio_volume: formData.audio_volume,
      };

      if (isEdit && invitationId) {
        // Update
        const { error } = await supabase
          .from('invitations')
          .update(payload)
          .eq('id', invitationId)
          .eq('user_id', userId);

        if (error) {
          if (error.code === '23505') {
            setSubmitError('رابط الدعوة مستخدم بالفعل. جرّب رابط مختلف.');
          } else {
            setSubmitError(error.message);
          }
          setSubmitting(false);
          return;
        }

        router.push(`/dashboard/invitations/${invitationId}/success`);
      } else {
        // Insert
        const { data: invitation, error } = await supabase
          .from('invitations')
          .insert({
            user_id: userId,
            ...payload,
          })
          .select()
          .single();

        if (error) {
          if (error.code === '23505') {
            setSubmitError('رابط الدعوة مستخدم بالفعل. جرّب رابط مختلف.');
          } else {
            setSubmitError(error.message);
          }
          setSubmitting(false);
          return;
        }

        router.push(`/dashboard/invitations/${invitation.id}/success`);
      }
    } catch (err) {
      setSubmitError('حدث خطأ غير متوقع. حاول مرة أخرى.');
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Step Indicator */}
      <Card variant="luxury">
        <CardBody className="py-8">
          <StepIndicator steps={STEPS} currentStep={currentStep} />
        </CardBody>
      </Card>

      {/* Form Content */}
      <Card variant="luxury">
        <CardBody className="p-6 sm:p-8 min-h-[400px]">
          {currentStep === 1 && (
            <Step1CoupleInfo
              data={formData}
              errors={errors}
              onChange={updateFormData}
            />
          )}

          {currentStep === 2 && (
            <Step2DateTime
              data={formData}
              errors={errors}
              onChange={updateFormData}
            />
          )}

          {currentStep === 3 && (
            <Step3Media
              data={formData}
              errors={errors}
              onChange={updateFormData}
              userId={userId}
            />
          )}

          {currentStep === 4 && (
            <Step4Review data={formData} onGoToStep={goToStep} />
          )}
        </CardBody>
      </Card>

      {/* Error */}
      {submitError && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm text-center">
          ⚠️ {submitError}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 1 || submitting}
          className="px-6 py-3 rounded-xl font-bold text-maroon-900 border-2 border-maroon-900 hover:bg-maroon-900 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-maroon-900"
        >
          السابق
        </button>

        <div className="text-sm text-maroon-900/50 order-last sm:order-none w-full sm:w-auto text-center">
          الخطوة {currentStep} من {STEPS.length}
        </div>

        {currentStep < STEPS.length ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-3 rounded-xl font-bold gradient-gold text-maroon-950 shadow-md hover:brightness-105 transition-all"
          >
            التالي
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleSubmit('draft')}
              disabled={submitting}
              className="px-6 py-3 rounded-xl font-bold text-maroon-900 border-2 border-maroon-900 hover:bg-maroon-900 hover:text-white transition-all disabled:opacity-50"
            >
              حفظ كمسودة
            </button>
            <button
              type="button"
              onClick={() => handleSubmit('published')}
              disabled={submitting}
              className="px-6 py-3 rounded-xl font-bold gradient-gold text-maroon-950 shadow-md hover:brightness-105 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-maroon-950/30 border-t-maroon-950 rounded-full animate-spin" />
                  {isEdit ? 'جاري الحفظ...' : 'جاري النشر...'}
                </>
              ) : (
                <>{isEdit ? '💾 حفظ التعديلات' : '🎉 نشر الدعوة'}</>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}