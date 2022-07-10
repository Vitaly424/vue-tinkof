import { computed, watch, ref } from "vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export function useLoginForm() {
  const loading = ref(false);
  const store = useStore();
  const router = useRouter();
  const { handleSubmit, isSubmitting, submitCount } = useForm();

  const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
    "email",
    yup
      .string()
      .trim()
      .required("Пожалуйста введите емайл")
      .email("Необходимо ввести корректный email")
  );

  const MIN_LENGTH = 6;

  const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
    "password",
    yup
      .string()
      .trim()
      .required("Пожалуйста введите пароль")
      .min(MIN_LENGTH, `Пароль не может быть меньше ${MIN_LENGTH} символов`)
  );

  const isTooManyAttempts = computed(() => submitCount.value >= 3);

  watch(isTooManyAttempts, (val) => {
    if (val) {
      setTimeout(() => {
        submitCount.value = 0;
      }, 2000);
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      loading.value = true;
      await store.dispatch("auth/login", values);
      loading.value = false;
      router.push("/");
    } catch (e) {
      loading.value = false;
      console.log('Ошибкааааа');
    }
  });

  return {
    email,
    onSubmit,
    isSubmitting,
    eError,
    eBlur,
    isTooManyAttempts,
    password,
    pError,
    pBlur,
    loading,
  };
}
