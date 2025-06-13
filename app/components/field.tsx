"use client";

const Field = ({ props = null }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 42 30"
    width="100%"
    {...props}
  >
    {/* Контур игрового поля */}
    <rect x="0" y="0" width="42" height="30" stroke="currentcolor" fill="none" strokeWidth="0.1" />

    {/* Вертикальные линии */}
    <line x1="4" y1="0" x2="4" y2="30" stroke="currentcolor" strokeWidth="0.05" />
    <line x1="24" y1="0" x2="24" y2="30" stroke="currentcolor" strokeWidth="0.05" />
    <line x1="33" y1="0" x2="33" y2="30" stroke="currentcolor" strokeWidth="0.05" />
  </svg>
);

export default Field;
