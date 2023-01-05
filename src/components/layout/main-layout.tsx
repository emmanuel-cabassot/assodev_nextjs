import { Footer } from "../footer/footer";
import { Header } from "../header/Header";

const MainLayout = ({ children } : { children : any}) => {
    return (
        <>
            <Header />
                {children}
            <Footer />
        </>
    );
};

export default MainLayout;