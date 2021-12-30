import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../TextInput";
import AppPhoneInput from "../PhoneInput";
import ErrorMessage from "./ErrorMessage";

function AppFormField({ name, width, phoneInput = false, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  return (
    <>
      {phoneInput ? (
        <AppPhoneInput
          onBlur={() => setFieldTouched(name)}
          onChangeText={(text) => setFieldValue(name, text)}
          value={values[name]}
          width={width}
          {...otherProps}
        />
      ) : (
        <AppTextInput
          onBlur={() => setFieldTouched(name)}
          onChangeText={(text) => setFieldValue(name, text)}
          value={values[name]}
          width={width}
          {...otherProps}
        />
      )}
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
