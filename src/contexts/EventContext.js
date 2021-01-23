import React, { useContext, useState } from "react";

const EventContext = React.createContext();

export function useEvent() {
  return useContext(EventContext);
}

export function EventProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [currentEvent, setCurrentEvent] = useState(null);
  const [allEvents, setAllEvents] = useState([]);

  const value = {
    showEditModal,
    setShowEditModal,
    loading,
    setLoading,
    showCreateModal,
    setShowCreateModal,
    showDeleteModal,
    setShowDeleteModal,
    currentEvent,
    setCurrentEvent,
    allEvents,
    setAllEvents,
  };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
}
