import { useEffect, useMemo, useState } from "react";
import { bpkihsMemes } from "../data/bpkihsMemes.js";
import { bpkihsQuestions } from "../data/bpkihsQuestions.js";

const PASS_STORAGE_KEY = "cloud_kitchen_bpkihs_pass_until";
const RECENT_STORAGE_KEY = "cloud_kitchen_bpkihs_recent_questions";
const RECENT_MEMES_STORAGE_KEY = "cloud_kitchen_bpkihs_recent_memes";
const PASS_DURATION_MS = 12 * 60 * 60 * 1000;
const RECENT_LIMIT = 20;
const RECENT_MEME_LIMIT = 8;

function readJsonStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJsonStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The gate still works if storage is unavailable; it just repeats sooner.
  }
}

function shuffle(values) {
  const nextValues = [...values];
  for (let index = nextValues.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [nextValues[index], nextValues[swapIndex]] = [nextValues[swapIndex], nextValues[index]];
  }
  return nextValues;
}

function pickQuestion() {
  const recentIds = readJsonStorage(RECENT_STORAGE_KEY, []);
  const knownIds = new Set(bpkihsQuestions.map((question) => question.id));
  const cleanRecentIds = recentIds.filter((id) => knownIds.has(id)).slice(0, RECENT_LIMIT);
  const availableQuestions = bpkihsQuestions.filter(
    (question) => !cleanRecentIds.includes(question.id)
  );
  const pool = availableQuestions.length ? availableQuestions : bpkihsQuestions;

  return pool[Math.floor(Math.random() * pool.length)];
}

function rememberQuestion(questionId) {
  const recentIds = readJsonStorage(RECENT_STORAGE_KEY, []);
  const nextRecentIds = [
    questionId,
    ...recentIds.filter((id) => id !== questionId)
  ].slice(0, RECENT_LIMIT);

  writeJsonStorage(RECENT_STORAGE_KEY, nextRecentIds);
}

function pickMeme() {
  const recentIds = readJsonStorage(RECENT_MEMES_STORAGE_KEY, []);
  const knownIds = new Set(bpkihsMemes.map((meme) => meme.id));
  const cleanRecentIds = recentIds.filter((id) => knownIds.has(id)).slice(0, RECENT_MEME_LIMIT);
  const availableMemes = bpkihsMemes.filter((meme) => !cleanRecentIds.includes(meme.id));
  const pool = availableMemes.length ? availableMemes : bpkihsMemes;

  return pool[Math.floor(Math.random() * pool.length)];
}

function rememberMeme(memeId) {
  const recentIds = readJsonStorage(RECENT_MEMES_STORAGE_KEY, []);
  const nextRecentIds = [
    memeId,
    ...recentIds.filter((id) => id !== memeId)
  ].slice(0, RECENT_MEME_LIMIT);

  writeJsonStorage(RECENT_MEMES_STORAGE_KEY, nextRecentIds);
}

export function hasValidBpkihsGatePass() {
  try {
    const passUntil = Number(window.localStorage.getItem(PASS_STORAGE_KEY));
    return Number.isFinite(passUntil) && passUntil > Date.now();
  } catch {
    return false;
  }
}

function grantBpkihsGatePass() {
  try {
    window.localStorage.setItem(PASS_STORAGE_KEY, String(Date.now() + PASS_DURATION_MS));
  } catch {
    // Unlock the current render even if the browser refuses persistent storage.
  }
}

export default function BpkihsGate({ onUnlock }) {
  const [question, setQuestion] = useState(pickQuestion);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isRejected, setIsRejected] = useState(false);
  const [rejectionMeme, setRejectionMeme] = useState(null);

  const options = useMemo(() => shuffle(question.options), [question]);

  useEffect(() => {
    rememberQuestion(question.id);
  }, [question.id]);

  function handleSubmit(event) {
    event.preventDefault();

    if (selectedAnswer === question.answer) {
      grantBpkihsGatePass();
      onUnlock();
      return;
    }

    const nextMeme = pickMeme();

    setRejectionMeme(nextMeme);
    rememberMeme(nextMeme.id);
    setIsRejected(true);
  }

  function handleRetry() {
    setQuestion(pickQuestion());
    setSelectedAnswer("");
    setRejectionMeme(null);
    setIsRejected(false);
  }

  if (isRejected) {
    return (
      <main className="flex min-h-[100svh] items-center justify-center bg-maroon px-4 py-6 text-white">
        <section className="w-full max-w-md overflow-hidden rounded-lg bg-white text-maroon-dark shadow-soft">
          <div className="px-4 pb-2 pt-4 text-center sm:px-5 sm:pt-5">
            <h1 className="text-2xl font-black leading-tight text-maroon-dark">
              Incorrect answer
            </h1>
          </div>

          <div className="bg-stone-950 p-4 text-center text-white">
            <img
              src={rejectionMeme?.src ?? bpkihsMemes[0]?.src}
              alt={rejectionMeme?.alt ?? "Access denied meme"}
              className="mx-auto max-h-[58svh] w-full max-w-72 rounded-lg object-contain"
              width="900"
              height="900"
            />
          </div>

          <div className="p-4 sm:p-5">
            <button
              type="button"
              onClick={handleRetry}
              className="flex h-11 w-full items-center justify-center rounded-full bg-maroon px-5 text-sm font-black text-white shadow-soft transition hover:bg-maroon-dark"
            >
              Try Again
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream text-maroon-dark">
      <section className="mx-auto flex min-h-[100svh] max-w-2xl flex-col justify-center px-4 py-5 sm:px-6">
        <h1 className="mb-4 text-center text-2xl font-black leading-tight text-maroon sm:mb-6 sm:text-4xl">
          Answer the question to access the menu
        </h1>

        <div>
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-maroon/10 bg-white p-4 shadow-soft sm:p-6"
          >
            <h2 className="text-xl font-black leading-snug text-maroon-dark sm:text-2xl">
              {question.prompt}
            </h2>

            <div className="mt-4 grid gap-2.5 sm:mt-5 sm:gap-3">
              {options.map((option) => {
                const isSelected = selectedAnswer === option;

                return (
                  <label
                    key={option}
                    className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-black transition sm:min-h-14 sm:p-3 sm:text-base ${
                      isSelected
                        ? "border-maroon bg-amber-50 text-maroon"
                        : "border-stone-200 bg-white text-stone-800 hover:border-gold hover:bg-amber-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="bpkihs-answer"
                      value={option}
                      checked={isSelected}
                      onChange={() => {
                        setSelectedAnswer(option);
                      }}
                      className="h-4 w-4 accent-maroon"
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>

            <button
              type="submit"
              disabled={!selectedAnswer}
              className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-maroon px-5 text-sm font-black text-white shadow-soft transition hover:bg-maroon-dark disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-600 sm:mt-5 sm:h-12"
            >
              Request Access
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
