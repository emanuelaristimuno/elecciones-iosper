import React, { useEffect, useState } from "react";
import { verifyRecaptcha }  from '../../services/Auth/Autenticacion';

const Recaptcha = React.forwardRef((props, ref) => {
    const { onChange, onRecaptchaValidado, onError} = props;
    const [ recaptchaLoaded, setRecaptchaLoaded] = useState(false);

    const handleChange = (token) => {
        onChange()
        validateToken(token)
    }

    const validateToken = async (token) => {
      try {
        const result = await verifyRecaptcha(token);
        if (result) {
          onRecaptchaValidado(true)
        }
      } catch(err) {
          onRecaptchaValidado(false)
          onError(err)
          resetRecaptcha()
        }
    }

    const onRecaptchaResponseExpiry = () => {
      onRecaptchaValidado(false)
    }
    
    const onRecaptchaError = (e) => {
      onRecaptchaValidado(false)
      onError(e)
      resetRecaptcha()
    }

    const resetRecaptcha = () => {
      if (window.grecaptcha) {
        window.grecaptcha.reset();      }
    }

    const recaptchaCallback = () => {
      if (!recaptchaLoaded) { 
        window.grecaptcha.ready(function() {
        window.grecaptcha.render("captcha", {
          "sitekey": props.sitekey,
        });
      });
      setRecaptchaLoaded(true)
      }
    }

    
    useEffect(() => {  
      window.handleChange = handleChange
      window.onRecaptchaResponseExpiry = onRecaptchaResponseExpiry
      window.onRecaptchaError = onRecaptchaError
      window.recaptchaCallback = recaptchaCallback
      window.resetRecaptcha = resetRecaptcha

      const loadScriptByURL = (id, url) => {
        const isScriptExist = document.getElementById(id);
    
        if (!isScriptExist) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            script.id = id;
            script.async = true;
            script.defer = true;
            
            document.body.appendChild(script);
        }
        else { 
          if (isScriptExist) recaptchaCallback();
        }
      }          

      loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?onload=recaptchaCallback&render=explicit`);
    
    });
 
    return (
      <div>
          <div
            id="captcha"
            data-callback="handleChange"
            data-expired-callback="onRecaptchaResponseExpiry"
            data-error-callback="onRecaptchaError"
            style={{transform:"scale(0.77)",WebkitTransform:"scale(0.77)",transformOrigin:"0 0",WebkitTransformOrigin:"0 0"}}
            >
          </div>
        </div>
    )
    
});

export default Recaptcha;