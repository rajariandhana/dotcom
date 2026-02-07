export default function SpeechBubble({ message }) {
  return (
    <div className="px-4 py-2 text-white rounded-full shadow-md bg-sky-500">
      {message}
    </div>
  );
}