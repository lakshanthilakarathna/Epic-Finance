import { useEffect } from "react";
import { accordion, milButtonClick, milButtonClick2 } from "@/src/common/utilits";
import SeoHead from "@/src/components/SeoHead";
import Footer from "./footers/Index";
import Header from "./headers/Index";

const Layouts = ({
  children,
  header,
  footer,
  noHeader,
  noFooter,
  transparent,
  headerTop,
  extarClass,
  faqSchema,
  noIndex,
}) => {
  useEffect(() => {
    milButtonClick();
    milButtonClick2();
    accordion();
  }, []);

  return (
    <div className="mil-wrapper">
      <SeoHead faqItems={faqSchema} noIndex={noIndex} />
      {!noHeader && (
        <Header
          header={header}
          transparent={transparent}
          headerTop={headerTop}
          extarClass={extarClass}
        />
      )}
      {children}
      {!noFooter && <Footer footer={footer} />}
    </div>
  );
};
export default Layouts;
