import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.textGroup}>
        <div className={styles.texttitle}>
          <p>VRUM</p>
          <p>VRUM</p>
        </div>
        <div className={styles.subtitletext}>
          <p>Seu app de listagem automotiva</p>
          <p>por algum motivo</p>
        </div>
      </div>
      <div className={styles.seconDiv}>
        <img className={styles.img} src="vrumnatal.png"  alt="Logo VRUM" />
        <p style={{
          fontSize: "1.5rem",
          // fontFamily: geistSans.variable,
          fontWeight: "900",
        color: "black",}
        }>Cadastre-se agora e garanta...</p>
        <button className={styles.button} type="button" ><a href="/cadastro-usuarios">Cadastre-se</a></button>
      </div>
    </div>
  );
}
