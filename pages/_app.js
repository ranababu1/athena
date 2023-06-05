import "../styles/global.css";
import { useState, useRef } from "react";
import jsPDF from "jspdf";
import ContentForm from "../components/ContentForm";
import Hero2 from "../components/Hero2";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
