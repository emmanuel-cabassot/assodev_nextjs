import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '../../context/authContext';
import { UserContext } from '../../context/userContext';
import { useContext, useEffect } from 'react';

export const Header = () => {
  const { token, meInfos, logout } = useContext(AuthContext);
  useEffect(() => {
    meInfos();
  }, []);
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
              {token ? (
                <>
                  <Link href={"/about-us"} >Profil</Link>
                  <button onClick={logout}>Logout</button>
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