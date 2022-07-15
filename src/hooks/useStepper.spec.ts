import { renderHook, act } from '@testing-library/react';
import { useStepper } from './useStepper';

describe('useStepper hook', () => {
  it('Should start with step 1 by default', () => {
    const { result } = renderHook(() => useStepper());
    expect(result.current.step).toBe(1);
  });

  it('Should allow the initial step to be overriden', () => {
    const { result } = renderHook(() => useStepper(3));
    expect(result.current.step).toBe(3);
  });

  it('Should increment and decrement steps', () => {
    const { result } = renderHook(() => useStepper());
    act(() => {
      result.current.goToNextStep();
      result.current.goToNextStep();
      result.current.goToNextStep();
      result.current.goToNextStep();
    });
    expect(result.current.step).toBe(5);

    act(() => {
      result.current.goToPrevStep();
      result.current.goToPrevStep();
    });

    expect(result.current.step).toBe(3);
  });

  it('Should programmatically set the step value', () => {
    const { result } = renderHook(() => useStepper());
    act(() => {
      result.current.setStep(4);
    });

    expect(result.current.step).toBe(4);
  });
});
