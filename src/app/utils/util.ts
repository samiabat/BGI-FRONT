// import { AbstractControl } from '@angular/forms';
// import { ENGLISH } from '../constants/language';

// export const addInputMask = (
//   control: AbstractControl | null,
//   cultureName: String
// ) => {
//   const pattern =
//     cultureName === ENGLISH ? /[^a-zA-Z 0-9]*/gi : /[^\u1200-\u137F 0-9]*/gi;
//   control?.valueChanges.subscribe((change) => {
//     console.log(change);
    

//     control?.setValue(change.replace(pattern, ''), { emitEvent: false });
//   })
// };
