import React, { useState } from 'react'
import { useStepper } from '@/hooks/useStepper'
import styles from './registrationForm.module.css'

type RegistrationFormProps = {}

const RegistrationForm = (props: RegistrationFormProps) => {
  const { step, goToNextStep, goToPrevStep } = useStepper()
  const [form, setForm] = useState({
    name: '',
    surname: '',
    address: '',
    city: '',
    email: '',
    password: '',
  })
  const [registerApiStatus, setRegisterApiStatus] = useState<
    'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR'
  >('IDLE')

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((formState) => ({ ...formState, [name]: value }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setRegisterApiStatus('PENDING')
      await fetch('/post-user', {
        method: 'post',
        body: JSON.stringify(form),
      })
      setRegisterApiStatus('SUCCESS')
    } catch (error) {
      setRegisterApiStatus('ERROR')
    }
  }

  return (
    <div>
      <div className="container mx-auto py-8">
        <div className="w-2/3 mx-auto shadow p-5">
          {registerApiStatus === 'SUCCESS' ? (
            <div>Welcome new user!</div>
          ) : (
            <form className="" onSubmit={onSubmit}>
              <h2 className="mb-6 text-2xl font-semibold">Register form</h2>
              <div className="mb-4">
                {step === 1 ? (
                  <>
                    <div className={styles.formBlock}>
                      <label htmlFor="name">Name</label>
                      <input
                        className={styles.inputField}
                        value={form.name}
                        id="name"
                        name="name"
                        onChange={onFieldChange}
                      />
                    </div>
                    <div className={styles.formBlock}>
                      <label htmlFor="surname">Surname</label>
                      <input
                        className={styles.inputField}
                        value={form.surname}
                        id="surname"
                        name="surname"
                        onChange={onFieldChange}
                      />
                    </div>
                  </>
                ) : null}
                {step === 2 ? (
                  <>
                    <div className={styles.formBlock}>
                      <label htmlFor="address">Address</label>
                      <input
                        className={styles.inputField}
                        value={form.address}
                        id="address"
                        name="address"
                        onChange={onFieldChange}
                      />
                    </div>
                    <div className={styles.formBlock}>
                      <label htmlFor="city">City</label>
                      <input
                        className={styles.inputField}
                        value={form.city}
                        id="city"
                        name="city"
                        onChange={onFieldChange}
                      />
                    </div>
                  </>
                ) : null}

                {step === 3 ? (
                  <>
                    <div className={styles.formBlock}>
                      <label htmlFor="email">Email</label>
                      <input
                        className={styles.inputField}
                        value={form.email}
                        id="email"
                        name="email"
                        onChange={onFieldChange}
                      />
                    </div>
                    <div className={styles.formBlock}>
                      <label htmlFor="password">Password</label>
                      <input
                        className={styles.inputField}
                        value={form.password}
                        id="password"
                        name="password"
                        onChange={onFieldChange}
                      />
                    </div>
                  </>
                ) : null}
              </div>
              <div className="flex justify-between mt-8">
                <div>
                  {step > 1 ? (
                    <button
                      type="button"
                      className={styles.stepBtn}
                      onClick={goToPrevStep}
                    >
                      Previous
                    </button>
                  ) : null}
                </div>
                <div>
                  {step < 3 ? (
                    <button
                      type="button"
                      className={styles.stepBtn}
                      onClick={goToNextStep}
                    >
                      Next
                    </button>
                  ) : null}

                  {step === 3 ? (
                    <button type="submit" className={styles.submitBtn}>
                      Submit
                    </button>
                  ) : null}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default RegistrationForm
