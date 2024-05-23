import "./App.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Account} from "./components/Account";

export const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="app">
                <Account/>
            </div>
        </QueryClientProvider>
    );
}

export default App;
