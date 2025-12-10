import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
}

export function SEO({
    title = 'Dopamine Detox Planner',
    description = 'Gamified anti-doom-scrolling tool. Level up your real life.'
}: SEOProps) {
    return (
        <Helmet>
            <title>{title} | DopaDetox</title>
            <meta name="description" content={description} />
            <meta name="theme-color" content="#10B981" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
        </Helmet>
    );
}
