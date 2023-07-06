import React from "react";
import Footer from "../components/Footer/Footer.tsx";
import Tab from "../components/Tab/Tab.tsx";

export default function About() {
  return (
    <React.StrictMode>
      <Tab
        text="Es importante cuidar al paciente, ser seguido por el paciente, pero sucederá en un momento en el que hay mucho trabajo y dolor. Porque para llegar al más mínimo detalle, nadie debe practicar ningún tipo de trabajo a menos que obtenga algún beneficio de él. No te enojes con el dolor en la reprimenda en el placer que quiere ser un cabello del dolor en la esperanza de que no haya crianza. A menos que estén cegados por la lujuria, no salen, están en falta quienes abandonan sus deberes y ablandan su corazón, es decir, sus trabajos."
        textRight="true"
        img="src\assets\about\happymexicanman.jpeg"
      />
      <Tab
        text="Es importante cuidar al paciente, ser seguido por el paciente, pero sucederá en un momento en el que hay mucho trabajo y dolor. Porque para llegar al más mínimo detalle, nadie debe practicar ningún tipo de trabajo a menos que obtenga algún beneficio de él. No te enojes con el dolor en la reprimenda en el placer que quiere ser un cabello del dolor en la esperanza de que no haya crianza. A menos que estén cegados por la lujuria, no salen, están en falta quienes abandonan sus deberes y ablandan su corazón, es decir, sus trabajos."
        textRight="false"
        img="src\assets\about\amigos.jpeg"
      />
      <Tab
        text="You won't believe the food you eat here. When we say authentic, we're not playing around. This is Mexican like you've never had before. But don't take our word for it; come by and taste the flavors for yourself!"
        textRight="true"
        img="src\assets\about\amigosgrub.jpg"
      />
    </React.StrictMode>
  );
}
