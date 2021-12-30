import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../Button";

function SubmitButton({ title, disabled = false }) {
  const { handleSubmit } = useFormikContext();

  return <AppButton title={title} onPress={handleSubmit} disabled={disabled} />;
}
export default SubmitButton;
