
import { LayoutContext } from '../../context/layoutContext';
import { useContext, useEffect, useRef } from 'react';

export const Footer = () => {
    const layoutContext = useContext(LayoutContext);
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (footerRef) {
            console.log('on rentre')
            console.log('footerRef', footerRef.current?.offsetHeight)
            if (footerRef.current)  {
                layoutContext.setFooterHeight(footerRef.current.offsetHeight);
                console.log('onrentre dans le deuxieme', footerRef.current)
            }

          }
        }, []);

    return (
        <footer ref={footerRef}>
            <p> © 2023 Time to Code - A Project Built with Next.js </p>
        </footer>
    )
}