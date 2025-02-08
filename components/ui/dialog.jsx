import * as React from "react";

const Dialog = ({ children, open, onOpenChange }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        {children}
      </div>
    </div>
  );
};

const DialogTrigger = ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
);

const DialogContent = ({ children }) => <div>{children}</div>;

const DialogHeader = ({ children }) => <div>{children}</div>;

const DialogTitle = ({ children }) => <h2>{children}</h2>;

const DialogDescription = ({ children }) => <p>{children}</p>;

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};