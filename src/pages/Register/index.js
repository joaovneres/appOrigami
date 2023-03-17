import React from "react";

import { useForm, Controller } from "react-hook-form";
import { View } from "react-native-animatable";

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  function handleRegister(data) {}

  return (
    <View>
        
    </View>
  )
}
