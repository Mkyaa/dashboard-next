import {NextResponse} from 'next/server'
import { isAuth } from './lib/auth'

export function middleware(req) {
    const { cookies } = req;

    if(!isAuth(cookies)) {
        return NextResponse.redirect(new URL("/", req.url))
    }
    return NextResponse.next()
    }


export const config = {
    matcher : "/dashboard/:path*"
    }