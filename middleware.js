import { NextResponse } from 'next/server';

export function middleware(request) {
    const url = request.nextUrl.clone();

    // Redirect /blog/* to /news/*
    if (url.pathname.startsWith('/blog')) {
        url.pathname = url.pathname.replace('/blog', '/news');
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: '/blog/:path*',
};