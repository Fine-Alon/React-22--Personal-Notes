import "./App.css";
import {AuthForm} from "./components/AuthForm";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="app">
                <AuthForm/>
            </div>
        </QueryClientProvider>
    );
}

export default App;
