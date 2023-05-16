import '../styles/global.css';
import { useState, useRef } from "react";
import jsPDF from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";
import HeroSection from "../components/HeroSection";
import ContentForm from "../components/ContentForm";
import Hero2 from "../components/Hero2";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
