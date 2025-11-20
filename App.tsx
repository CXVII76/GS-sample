import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Roadmap from './components/Roadmap';
import PipelineVisualizer from './components/PipelineVisualizer';
import ChatAssistant from './components/ChatAssistant';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>(ViewState.DASHBOARD);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.ROADMAP:
        return <Roadmap />;
      case ViewState.PIPELINE_VISUAL:
        return <PipelineVisualizer />;
      case ViewState.ASSISTANT:
        return <ChatAssistant />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setView}>
      {renderContent()}
    </Layout>
  );
};

export default App;