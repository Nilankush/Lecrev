import { AppSidebar } from "./components/app-sidebar";
import Header from "./components/header";
import Home from "./components/home";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";

function App() { 
  return (
    <div>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar/>
        <SidebarInset>
          <main>
            <Header/>
            <Home/>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default App;
