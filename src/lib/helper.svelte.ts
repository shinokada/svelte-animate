export function controlHelpers(callbacks?: {
  onToggle?: (isOpen: boolean) => void;
  onStart?: () => void;
  onEnd?: () => void;
}) {
  let isStarted: boolean = $state(false);
  
  function toggle() {
    isStarted = !isStarted;
    callbacks?.onToggle?.(isStarted);
  }
  
  function end() {
    isStarted = false;
    callbacks?.onEnd?.();
  }
  
  function start() {
    isStarted = true;
    callbacks?.onStart?.();
  }
  
  return {
    get isStarted() {
      return isStarted;
    },
    set isStarted(value: boolean) {
      isStarted = value;
    },
    toggle,
    start,
    end
  };
}