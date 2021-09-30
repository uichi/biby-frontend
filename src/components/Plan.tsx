import {
  Provider,
  defaultTheme,
  View,
  Heading,
  Text,
} from "@adobe/react-spectrum";
// import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
//import { getMe } from "../api/Authentication";
//import Loading from "./common/Loading";
// import {
//   CardElement,
//   useStripe,
//   useElements,
//   Elements,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import scrollToTop from "./common/scrollToTop";

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   scrollToTop();
//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (!stripe || !elements) {
//       return;
//     }
//     const cardElement: any = elements.getElement(CardElement);
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardElement,
//     });
//     if (error) {
//       console.log("[error]", error);
//     } else {
//       console.log("[PaymentMethod]", paymentMethod);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// };

const Plan = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  if (!cookies.authToken) return <Redirect to="/login" />;
  //  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  // const [stripePromise, setStripePromise] = useState<any>(
  //   loadStripe(
  //     ""
  //   )
  // );
  //  const stripePromise = loadStripe('pk_test_51JEXLmBnNUX5BcoNwtp0WZUTuz8DxxuDs3Vp7wTDanYBEUEQR0kyFk6XTH5gzlbCArQBWdwrqFb6HMcIBVMXUlGs00HylFPm6y');
  scrollToTop();

  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      {/* isLoaded && <Loading /> */}
      <Toaster position="top-center" />
      <Header />
      <View
        backgroundColor="gray-200"
        gridArea="content"
        minHeight="92vh"
        paddingTop="8vh"
        // paddingBottom="8vh"
      >
        <View margin="size-100">
          <Heading level={3}>プレミアムプラン(準備中)</Heading>
        </View>
        <View
          margin="size-100"
          marginTop="size-200"
          borderWidth="thin"
          borderColor="dark"
          borderRadius="small"
          backgroundColor="gray-400"
          padding="size-100"
        >
          <View>
            <Heading level={4} marginTop="size-0" marginBottom="size-100">
              ペットの登録数無制限
            </Heading>
            <Text>登録できるペット数が無制限になります。</Text>
          </View>
          <View marginTop="size-200">
            <Heading level={4} marginTop="size-0" marginBottom="size-100">
              ペットの記録登録数無制限
            </Heading>
            <Text>登録できるペットの記録が無制限になります。</Text>
          </View>
        </View>
        {/* <View margin="size-100">
          <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        </View> */}
      </View>
      <Footer />
    </Provider>
  );
};

export default Plan;
