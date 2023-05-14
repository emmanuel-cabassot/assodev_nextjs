import { Footer } from "../footer/footer";
import { Header } from "../header/Header";
import { useContext } from "react";
import { LayoutContext } from "../../context/layoutContext";

const MainLayout = ({ children } : { children : any}) => {
    const { headerHeight, footerHeight } = useContext(LayoutContext);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <div style={{ flexGrow: 1 }}>
            {children}
          </div>
          <Footer />
        </div>
      );
};

export default MainLayout;
