"use client";

import { useState } from "react";

const clips = [
  {
    id: "youth",
    label: "Youth power",
    title: "A generation ready to lead",
    description: "Young people bring urgency, creativity, and new energy to community action.",
    src: "/media/video/v06-diverse-friends-circle-outdoors.mp4?v=20260811-2",
    poster: "/media/video/posters/v06-diverse-friends-circle-outdoors-poster.webp?v=20260811-2",
    alt: "A diverse group of young adults smiling in a circle outdoors.",
  },
  {
    id: "collaboration",
    label: "Collaboration",
    title: "Ideas become action together",
    description: "Organizing begins when people share ideas, listen, and decide what to build together.",
    src: "/media/video/v09-muslim-women-collaborating-cafe.mp4?v=20260811-2",
    poster: "/media/video/posters/v09-muslim-women-collaborating-cafe-poster.webp?v=20260811-2",
    alt: "Four women in head coverings collaborating around a tablet at a table.",
  },
  {
    id: "civic",
    label: "Every voice",
    title: "Show up for democracy",
    description: "Welcoming, practical civic engagement makes participation feel possible for every community.",
    src: "/media/video/v03-volunteer-greeting-family-polling-place.mp4?v=20260811-2",
    poster: "/media/video/posters/v03-volunteer-greeting-family-polling-place-poster.webp?v=20260811-2",
    alt: "A volunteer greeting people as they arrive at a polling place.",
  },
];

export function MediaStory() {
  const [activeId, setActiveId] = useState(clips[0].id);
  const active = clips.find((clip) => clip.id === activeId) ?? clips[0];

  return (
    <div className="media-story">
      <div className="media-player">
        <video key={active.src} controls muted playsInline preload="metadata" poster={active.poster} aria-label={active.alt}>
          <source src={active.src} type="video/mp4" />
          Your browser does not support hosted video.
        </video>
        <div className="media-player-caption" aria-live="polite">
          <span>{active.label}</span>
          <div><strong>{active.title}</strong><p>{active.description}</p></div>
          <small>Licensed visual storytelling · silent footage</small>
        </div>
      </div>
      <div className="clip-selector" aria-label="Choose a featured community clip">
        {clips.map((clip, index) => (
          <button key={clip.id} className={clip.id === active.id ? "active" : ""} type="button" onClick={() => setActiveId(clip.id)} aria-pressed={clip.id === active.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <img src={clip.poster} alt="" decoding="async" />
            <strong>{clip.label}</strong>
            <i aria-hidden="true">Play ↗</i>
          </button>
        ))}
      </div>
    </div>
  );
}
