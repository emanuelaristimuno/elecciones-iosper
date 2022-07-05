export const currencyFormatter = () => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
    });
};

export const dateFormatter = () => {
    return new Intl.DateTimeFormat('es-AR', {
        dateStyle: 'short',
        timeStyle: 'short'
    });
};

/**
 * Recibe un string date yyyy-mm-dd y devuelve dd de MM de yyyy
 * 
 * @param String 
 * @return String
 */
export const dateBirthFormatter = (date) => {
    if (!date) {
        return null
    }
    
    return (new Intl.DateTimeFormat('es-AR', {
        dateStyle: 'long'
    }).format( new Date(date) ));
}

/**
 * Función que transforma una cadena en base64 a Blob.
 * para PDF, imágenes, etc.
 * @param String
 * @param String
 * @param int
 * @return Blob
 */
export const base64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
};