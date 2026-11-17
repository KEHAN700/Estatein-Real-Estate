import PinIcon from '@/assets/icons/pin.svg?react';
import { Field, Input, Textarea } from '@/components/form/fields';
import { FormShell } from '@/components/form/FormShell';
import { propertyInquirySchema } from '@/components/form/schemas';
import { useSiteForm } from '@/components/form/useSiteForm';
import s from './forms.module.scss';

interface Props {
  slug: string;
  label: string;
}

export function PropertyInquiryForm({ slug, label }: Props) {
  const { form, onSubmit, feedback, submitting } = useSiteForm('property-inquiry', propertyInquirySchema, {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    property: slug,
    message: '',
    agree: false,
  });
  const { register, formState: { errors } } = form;

  return (
    <FormShell
      compact
      onSubmit={onSubmit}
      submitting={submitting}
      feedback={feedback}
      agreeProps={register('agree')}
      agreeError={errors.agree?.message}
    >
      <Field label="First Name" error={errors.firstName?.message} className={s.half}>
        {(id) => <Input id={id} placeholder="Enter First Name" autoComplete="given-name" invalid={!!errors.firstName} {...register('firstName')} />}
      </Field>
      <Field label="Last Name" error={errors.lastName?.message} className={s.half}>
        {(id) => <Input id={id} placeholder="Enter Last Name" autoComplete="family-name" invalid={!!errors.lastName} {...register('lastName')} />}
      </Field>
      <Field label="Email" error={errors.email?.message} className={s.half}>
        {(id) => <Input id={id} type="email" placeholder="Enter your Email" autoComplete="email" invalid={!!errors.email} {...register('email')} />}
      </Field>
      <Field label="Phone" error={errors.phone?.message} className={s.half}>
        {(id) => <Input id={id} type="tel" placeholder="Enter Phone Number" autoComplete="tel" invalid={!!errors.phone} {...register('phone')} />}
      </Field>
      <Field label="Selected Property" className={s.full}>
        {(id) => (
          <div className={s.selected}>
            <Input id={id} value={label} readOnly tabIndex={-1} />
            <PinIcon aria-hidden />
          </div>
        )}
      </Field>
      <input type="hidden" {...register('property')} />
      <Field label="Message" error={errors.message?.message} className={s.full}>
        {(id) => <Textarea id={id} placeholder="Enter your Message here.." invalid={!!errors.message} {...register('message')} />}
      </Field>
    </FormShell>
  );
}
