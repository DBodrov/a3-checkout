import React from 'react';

// inspired by google-pay-button/react
let cachedScripts: Record<string, Promise<void>> = {};

export function loadScript(src: string): Promise<void> {
  const existing = cachedScripts[src];
  if (existing) {
    return existing;
  }

  const promise = new Promise<void>((resolve, reject) => {
    // Create script
    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    // Script event listener callbacks for load and error
    const onScriptLoad = (): void => {
      resolve();
    };

    const onScriptError = (): void => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      cleanup();

      // Remove from cachedScripts so that we can try loading again
      delete cachedScripts[src];
      script.remove();

      reject();
    };

    script.addEventListener('load', onScriptLoad);
    script.addEventListener('error', onScriptError);

    // Add script to document body
    document.body.appendChild(script);

    // Remove event listeners on cleanup
    function cleanup(): void {
      script.removeEventListener('load', onScriptLoad);
      script.removeEventListener('error', onScriptError);
    }
  });

  cachedScripts[src] = promise;

  return promise;
}

// function removeScript(url: string) {
//   const scripts = document.getElementsByTagName('script');
//   for (let script of scripts) {
//     if (script.src === url) {
//       console.log('remove script ', script)
//       script.remove();
//       cachedScripts = {};
//     }
//   }
// }

export function useScript(scriptUrl: string) {
  const [stateScript, setState] = React.useState('idle');
  React.useEffect(() => {
    setState('loading');
    const loadAsyncScript = async () => {
      try {
        await loadScript(scriptUrl);
        setState('success');

      } catch (error) {
        setState('error');
      }
    }
    loadAsyncScript();
  }, [scriptUrl]);

  return {
    isSuccess: stateScript === 'success',
    isError: stateScript === 'error',
    isLoading: stateScript === 'idle' || stateScript === 'loading',
    stateScript
  }
}
