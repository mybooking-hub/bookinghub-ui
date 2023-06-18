import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet } from 'react-router-dom';
import FooterLinks from 'src/components/footer.comp';
import { HeaderTabs } from 'src/components/main.header';

export default function DefaultLayout() {
    return (
        <>
            <HeaderTabs
                tabs={[
                    { label: "Home", link: "/" },
                    { label: "Browse Performances", link: "/browse-performance" },
                    { label: "About MyBookingHub", link: "/about-us" }
                ]}
            />
            <Outlet />
            <FooterLinks data={[{ title: 'About', links: [{ label: 'Features', link: '/' }] }, { title: 'Contact', links: [{ label: 'Contact us', link: '/contact-us' }] }]} />
            <ReactQueryDevtools />
        </>
    )
}