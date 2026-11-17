import PhoneIcon from '@/assets/icons/phone.svg?react';
import MailIcon from '@/assets/icons/mail.svg?react';
import { usePropertyFilters } from '@/api/queries';
import { Field, Input, RadioCard, Select, Textarea } from '@/components/form/fields';
import { FormShell } from '@/components/form/FormShell';
import { propertyRequestSchema, type PropertyRequestValues } from '@/components/form/schemas';
import { useSiteForm } from '@/components/form/useSiteForm';
import { roomOptions } from '@/lib/options';
import s from './forms.module.scss';

const defaults: Partial<PropertyRequestValues> = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: '',
  propertyType: '',
  bathrooms: '',
  bedrooms: '',
  budget: '',
  contactMethod: 'phone',
  message: '',
  agree: false,
};

export function PropertyRequestForm() {
  const { data: filters } = usePropertyFilters();
  const { form, onSubmit, feedback, submitting } = useSiteForm('property-request', propertyRequestSchema, defaults);
  const { register, watch, formState: { errors } } = form;
  const [phone, email] = watch(['phone', 'email']);

  return (
    <FormShell
      onSubmit={onSubmit}
      submitting={submitting}
      feedback={feedback}
      agreeProps={register('agree')}
      agreeError={errors.agree?.message}
    >
      <Field label="First Name" error={errors.firstName?.message} className={s.quarter}>
        {(id) => <Input id={id} placeholder="Enter First Name" autoComplete="given-name" invalid={!!errors.firstName} {...register('firstName')} />}
      </Field>
      <Field label="Last Name" error={errors.lastName?.message} className={s.quarter}>
        {(id) => <Input id={id} placeholder="Enter Last Name" autoComplete="family-name" invalid={!!errors.lastName} {...register('lastName')} />}
      </Field>
      <Field label="Email" error={errors.email?.message} className={s.quarter}>
        {(id) => <Input id={id} type="email" placeholder="Enter your Email" autoComplete="email" invalid={!!errors.email} {...register('email')} />}
      </Field>
      <Field label="Phone" error={errors.phone?.message} className={s.quarter}>
        {(id) => <Input id={id} type="tel" placeholder="Enter Phone Number" autoComplete="tel" invalid={!!errors.phone} {...register('phone')} />}
      </Field>

      <Field label="Preferred Location" error={errors.location?.message} className={s.quarter}>
        {(id) => <Select id={id} placeholder="Select Location" options={filters?.locations ?? []} invalid={!!errors.location} {...register('location')} />}
      </Field>
      <Field label="Property Type" error={errors.propertyType?.message} className={s.quarter}>
        {(id) => <Select id={id} placeholder="Select Property Type" options={filters?.types ?? []} invalid={!!errors.propertyType} {...register('propertyType')} />}
      </Field>
      <Field label="No. of Bathrooms" error={errors.bathrooms?.message} className={s.quarter}>
        {(id) => <Select id={id} placeholder="Select no. of Bathrooms" options={roomOptions} invalid={!!errors.bathrooms} {...register('bathrooms')} />}
      </Field>
      <Field label="No. of Bedrooms" error={errors.bedrooms?.message} className={s.quarter}>
        {(id) => <Select id={id} placeholder="Select no. of Bedrooms" options={roomOptions} invalid={!!errors.bedrooms} {...register('bedrooms')} />}
      </Field>

      <Field label="Budget" error={errors.budget?.message} className={s.half}>
        {(id) => <Select id={id} placeholder="Select Budget" options={filters?.prices ?? []} invalid={!!errors.budget} {...register('budget')} />}
      </Field>
      <fieldset className={`${s.half} ${s.fieldset}`}>
        <legend className={s.legend}>Preferred Contact Method</legend>
        <div className={s.methods}>
          <RadioCard value="phone" icon={<PhoneIcon aria-hidden />} {...register('contactMethod')}>
            <span data-filled={Boolean(phone)}>{phone || 'Enter Your Number'}</span>
          </RadioCard>
          <RadioCard value="email" icon={<MailIcon aria-hidden />} {...register('contactMethod')}>
            <span data-filled={Boolean(email)}>{email || 'Enter Your Email'}</span>
          </RadioCard>
        </div>
      </fieldset>

      <Field label="Message" error={errors.message?.message} className={s.full}>
        {(id) => <Textarea id={id} placeholder="Enter your Message here.." invalid={!!errors.message} {...register('message')} />}
      </Field>
    </FormShell>
  );
}
