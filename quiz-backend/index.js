const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const quizData = [
  {
    question: "Welcher Planet liegt am dichtesten an der Sonne?",
    options: [
      { text: "Mars", isCorrect: false },
      { text: "Erde", isCorrect: false },
      { text: "Merkur", isCorrect: true },
      { text: "Venus", isCorrect: false },
    ],
  },
  {
    question: 'Welches Sortierverfahren hat im Durchschnitt die beste Laufzeitkomplexität?',
    options: [
      { text: 'Bubble Sort', isCorrect: false },
      { text: 'Insertion Sort', isCorrect: false },
      { text: 'Quick Sort', isCorrect: true },
      { text: 'Selection Sort', isCorrect: false },
    ],
  },
  {
    question: 'Was ist die Big-O-Notation?',
    options: [
      { text: 'Ein Algorithmus zur Lösung von Problemen', isCorrect: false },
      { text: 'Eine Notation zur Beschreibung von Algorithmen', isCorrect: false },
      { text: 'Eine Notation zur Beschreibung der Laufzeitkomplexität von Algorithmen', isCorrect: true },
      { text: 'Eine Methode zum Testen von Algorithmen', isCorrect: false },
    ],
  },
  {
    question: 'In welchem Jahr wurde der erste C++-Standard veröffentlicht?',
    options: [
      { text: '1985', isCorrect: false },
      { text: '1998', isCorrect: true },
      { text: '2003', isCorrect: false },
      { text: '2011', isCorrect: false },
    ],
  },
  {
    question: 'Was ist die Hauptfunktion von Betriebssystemen?',
    options: [
      { text: 'Hardware-Ressourcen verwalten', isCorrect: true },
      { text: 'Nur Textverarbeitung', isCorrect: false },
      { text: 'Nur Internetverbindungen herstellen', isCorrect: false },
      { text: 'Nur Software-Entwicklung unterstützen', isCorrect: false },
    ],
  },
  {
    question: 'Welche Datenstruktur verwendet der LRU-Cache (Least Recently Used)?',
    options: [
      { text: 'Stack', isCorrect: false },
      { text: 'Queue', isCorrect: false },
      { text: 'Linked List', isCorrect: false },
      { text: 'Hash Map und Doubly Linked List', isCorrect: true },
    ],
  },
];

app.get('/quiz', (req, res) => {
  res.json(quizData);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
