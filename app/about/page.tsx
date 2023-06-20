import { Metadata } from 'next';

export const dynamic = 'force-static'; // no necessary, just for demonstration

export const metadata: Metadata = {
  title: 'Objecive Marker Config',
  description: 'Configure the objectives',
};

export default async function About() {
  return (
    <div>
      <h1>About this Project</h1>
      <p>  Hahaha you think I have time to write an about page.</p>
    </div>
  );
}