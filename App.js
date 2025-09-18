import { StripeProvider } from "@stripe/stripe-react-native";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51S8lghEZMsM9cOBPVV1s6NxfHlEg86RKy02iL9sH4COZJAPvzpVQDbJZaeCJ73znD87hgmSR0OVx5FFXmzzAewk200BdKZaFHO">
      <AppNavigator />
    </StripeProvider>
  );
}
