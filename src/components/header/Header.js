import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '../../context/authContext';
import { useContext, useEffect } from 'react';
const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

export const Header = () => {
  const { token, meInfos, logout, user, refreshToken } = useContext(AuthContext);
  useEffect(() => {
    meInfos();
  }, []);
  
  const imageProfile = user && user.profileImage != null ? user.profileImage : "tux_love_windowsd6d93104-a8f5-48c7-b882-f72f204b85cb.png";

  return (
    <header>
      <div>
        <div className="topNav">
          <Image alt="logo" src={'/favicon.ico'} width={50} height={50} />
          <nav>
            <ul>
              <li>
                <Link href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events">
                  Events
                </Link>
              </li>
              
              <li>
                <Link href="/about-us">
                  About us
                </Link>
              </li>
              {token && user ? (
                <>
                  <li>
                    <Link href={"/about-us"} >
                      <Image
                        src={`${urlApiNest}/user/profile-image/${user.profileImage}`}
                        //src={`${urlApiNest}/user/profile-image/tux_love_windowsd6d93104-a8f5-48c7-b882-f72f204b85cb.png`}
                        alt={'photo'}
                        width={20}
                        height={20}
                      />
                    </Link>
                  </li>
                  <li>
                    <button onClick={logout}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/auth/register">
                      register
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/login">
                      login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
        <p className="title"> Mon super site</p>
      </div>
    </header>
  );
};
