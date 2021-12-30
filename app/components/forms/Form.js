import React, { useState, useEffect } from "react";
import { Formik } from "formik";

function AppForm({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  getErrors,
}) {
  const [stateErrors, setStateErrors] = useState(null);

  useEffect(() => {
    getErrors(stateErrors);
  }, [stateErrors]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ errors }) => {
        setStateErrors(errors);
        return <>{children}</>;
      }}
    </Formik>
  );
}

export default AppForm;
