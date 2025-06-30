import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Mail, ArrowRight, ChevronRight, FileText, Code, Brain, BookOpen, Database, Cpu, Activity, GitBranch, Microscope, LineChart, Network, Layers, Bot, Workflow, BarChart as ChartBar, MessageSquare } from 'lucide-react';
import EyeLogo from '../components/EyeLogo';

function ResearchPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeArea, setActiveArea] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const researchAreas = [
    {
      id: 'llm-signals',
      icon: Brain,
      title: 'LLM Signal Processing',
      description: 'Advanced natural language understanding for financial signals extraction from social media and news sources.',
      papers: [
        'Social Media Alpha: Measuring the Predictive Power of Twitter Sentiment on Stock Returns',
        'Real-time Market Impact Analysis Using GPT-4 Language Models',
        'Quantifying the Information Content of Influential Twitter Accounts'
      ]
    },
    {
      id: 'quantitative-models',
      icon: LineChart,
      title: 'Quantitative Models',
      description: 'Novel approaches to quantitative trading strategies using AI-driven decision models.',
      papers: [
        'Neural Signal Decomposition for High-Frequency Trading',
        'Adaptive Portfolio Optimization with Reinforcement Learning',
        'Multi-factor Alpha Generation Using Transformer Architectures'
      ]
    },
    {
      id: 'risk-frameworks',
      icon: Activity,
      title: 'AI Risk Frameworks',
      description: 'Building robust risk management systems for AI-driven trading strategies.',
      papers: [
        'Dynamic Risk Assessment in LLM-driven Trading Systems',
        'Tail Risk Modeling for AI-Generated Trade Signals',
        'Adversarial Testing of Language Model Trading Strategies'
      ]
    },
    {
      id: 'neural-architectures',
      icon: Network,
      title: 'Neural Architectures',
      description: 'Custom neural network architectures optimized for financial time series and text analysis.',
      papers: [
        'Hybrid CNN-Transformer Models for Cross-Modal Financial Prediction',
        'Attention-based Architectures for Multi-timeframe Market Analysis',
        'Graph Neural Networks for Corporate Event Detection'
      ]
    }
  ];

  const recentPublications = [
    {
      title: 'When AI Meets Finance (StockAgent): Large Language Model-based Stock Trading in Simulated Real-world Environments',
      authors: ['Chong Zhang', 'Xinyi Liu', 'Zhongmou Zhang', 'Mingyu Jin', 'Lingyao Li', 'Zhenting Wang', 'Wenyue Hua', 'Dong Shu', 'Suiyuan Zhu', 'Xiaobo Jin', 'Sujian Li', 'Mengnan Du', 'Yongfeng Zhang'],
      date: 'July 2024',
      venue: 'arXiv',
      abstract: 'This paper introduces "StockAgent," a multi-agent AI system powered by LLMs designed to simulate investor trading behaviors in response to real-world stock market conditions. The system evaluates the impact of various external factors on trading behavior and profitability.',
      citations: 2,
      link: 'arXiv:2407.18957',
      institutions: 'University of Liverpool, Peking University, Shanghai University of Finance and Economics, Rutgers University, University of Michigan, Northwestern University, New York University'
    },
    {
      title: 'Large Language Model Agent in Financial Trading: A Survey',
      authors: ['Han Ding', 'Yinheng Li', 'Junhao Wang', 'Hang Chen'],
      date: 'August 2024',
      venue: 'arXiv',
      abstract: 'This survey provides a comprehensive overview of the current state of LLM-based financial trading agents. It discusses common architectures, data inputs, performance metrics, and challenges associated with LLM trading agents.',
      citations: 0,
      link: 'arXiv:2408.06361'
    },
    {
      title: 'Advancing Algorithmic Trading with Large Language Models: A Reinforcement Learning Approach for Stock Market Optimization',
      authors: ['Ali Riahi Samani', 'Fateme Golivand Darvishvand', 'Feng Chen'],
      date: 'September 2024',
      venue: 'OpenReview',
      abstract: 'This paper presents a novel approach to algorithmic trading by integrating Deep Reinforcement Learning (DRL) with LLMs. The authors develop the "Stock-Evol-Instruct" algorithm, which enables RL agents to refine their trading strategies using LLM-driven insights for daily stock trading decisions.',
      citations: 15,
      link: 'OpenReview: w7BGq6ozOL'
    },
    {
      title: 'Can Large Language Models Trade? Testing Financial Theories with LLM Agents in Market Simulations',
      authors: ['Alejandro Lopez-Lira'],
      date: 'April 2025',
      venue: 'arXiv',
      abstract: 'This study explores the capabilities of LLMs as trading agents within a simulated stock market environment. The findings reveal that LLMs can adhere to consistent strategies, functioning as value investors, momentum traders, or market makers.',
      citations: 63,
      link: 'arXiv:2504.10789',
      institutions: 'University of Florida'
    },
    {
      title: 'LLM Trading: Analysis of LLM Agent Behavior in Experimental Asset Markets',
      authors: ['Thomas Henning', 'Siddhartha M. Ojha', 'Ross Spoon', 'Jiatong Han', 'Colin F. Camerer'],
      date: 'February 2025',
      venue: 'arXiv',
      abstract: 'This paper investigates the behavior of LLM-based agents in experimental asset markets known for eliciting bubbles and crashes among human participants. The study finds that LLM agents generally exhibit rational pricing behavior.',
      citations: 42,
      link: 'arXiv:2502.15800',
      institutions: 'California Institute of Technology, Zhejiang University'
    },
    {
      title: 'FinRL-DeepSeek: LLM-Infused Risk-Sensitive Reinforcement Learning for Trading Agents',
      authors: ['Mostapha Benhenda'],
      date: 'February 2025',
      venue: 'arXiv',
      abstract: 'This research introduces a risk-sensitive trading agent that combines reinforcement learning with LLMs. The agent extends the Conditional Value-at-Risk Proximal Policy Optimization (CPPO) algorithm by incorporating risk assessments and trading recommendations generated by LLMs from financial news.',
      citations: 28,
      link: 'arXiv:2502.07393'
    },
    {
      title: 'Sentiment Trading with Large Language Models',
      authors: ['Guido Germano'],
      date: 'January 2024',
      venue: 'SSRN',
      abstract: 'This study examines the utility of LLM representations in modeling stock returns through sentiment analysis. By conducting experiments, the research demonstrates how LLMs can effectively capture sentiment from financial texts.',
      citations: 35,
      link: 'SSRN: 4706629',
      institutions: 'University College London, London School of Economics and Political Science'
    },
    {
      title: 'AI-Powered Collusion in Financial Markets',
      authors: ['Winston Wei Dou', 'Itay Goldstein', 'Yan Ji'],
      date: 'August 2024',
      venue: 'Wharton Finance',
      abstract: 'This article discusses the potential for AI-driven trading algorithms to engage in tacit collusion, leading to reduced market liquidity and price informativeness. It underscores the need for regulatory frameworks to address the challenges posed by autonomous trading systems.',
      citations: 89,
      link: 'Wharton Finance Pillar Blog',
      institutions: 'University of Pennsylvania (Wharton School), New York University'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-3 group">
                <EyeLogo className="w-6 h-6 transition-transform duration-700 group-hover:scale-110" />
                <span className="font-mono text-sm tracking-[0.2em]">wire84</span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-8">
                {['ABOUT', 'STRATEGIES', 'RESEARCH'].map((item) => (
                  <Link 
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    className={`relative group text-gray-400 hover:text-white transition-colors duration-300 font-mono text-sm tracking-[0.15em] ${
                      item === 'RESEARCH' ? 'text-white' : ''
                    }`}
                  >
                    {item}
                    <span className={`absolute -bottom-1 left-0 h-px bg-red-500/30 transition-all duration-300 ${
                      item === 'RESEARCH' ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <Link 
                to="/terminal"
                className="hidden md:flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors duration-300 font-mono group"
              >
                <Terminal className="h-4 w-4 transition-transform duration-500 group-hover:scale-110" />
                <span className="tracking-wider">Terminal</span>
              </Link>
              
              <Link 
                to="/waitlist"
                className="relative overflow-hidden bg-red-500/10 hover:bg-red-500/20 text-red-500 px-6 py-2.5 rounded-lg text-sm font-mono tracking-wider transition-all duration-300 flex items-center space-x-2 group"
              >
                <Mail className="h-4 w-4" />
                <span>Join Waitlist</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-16 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="inline-flex items-center space-x-2 bg-red-500/10 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-mono text-red-500">RESEARCH CENTER</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-6">
              Advancing the frontier of
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 font-medium">
                AI-driven finance
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg max-w-3xl mb-8">
              Our research lab explores the intersection of large language models, quantitative finance, and high-frequency trading. We publish groundbreaking work on LLM signal processing, neural architectures, and risk management frameworks.
            </p>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-3 text-gray-400">
                <BookOpen className="h-5 w-5 text-red-500" />
                <span>4 Publications</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Code className="h-5 w-5 text-red-500" />
                <span>2 Research Scientists</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Cpu className="h-5 w-5 text-red-500" />
                <span>12 Datasets</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Research Areas */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-12">Research Areas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchAreas.map((area) => (
              <button
                key={area.id}
                onClick={() => setActiveArea(activeArea === area.id ? null : area.id)}
                className={`group text-left p-6 rounded-xl border transition-all duration-300 ${
                  activeArea === area.id
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-gray-900/30 border-gray-800/50 hover:border-red-500/30'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <area.icon className="h-6 w-6 text-red-500" />
                    <h3 className="text-xl font-medium">{area.title}</h3>
                  </div>
                  <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                    activeArea === area.id ? 'rotate-90' : ''
                  }`} />
                </div>
                
                <p className="text-gray-400 mb-4">{area.description}</p>
                
                <div className="flex space-x-6 text-sm">
                  <div>
                    <span className="text-white font-mono">March 2025</span>
                    <span className="text-gray-500 ml-1">Started</span>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      area.id === 'llm-signals' ? 'bg-green-500/20 text-green-500' :
                      area.id === 'quantitative-models' ? 'bg-yellow-500/20 text-yellow-500' :
                      area.id === 'risk-frameworks' ? 'bg-red-500/20 text-red-500' :
                      'bg-blue-500/20 text-blue-500'
                    }`}>
                      {area.id === 'llm-signals' ? 'Production' :
                       area.id === 'quantitative-models' ? 'Testing' :
                       area.id === 'risk-frameworks' ? 'Development' :
                       'Research'}
                    </span>
                  </div>
                  <div>
                    <span className="text-white font-mono">3</span>
                    <span className="text-gray-500 ml-1">Datasets</span>
                  </div>
                </div>
                
                {activeArea === area.id && (
                  <div className="mt-6 pt-6 border-t border-gray-800/50">
                    <h4 className="text-sm font-medium mb-4 text-gray-300">Selected Publications</h4>
                    <ul className="space-y-3">
                      {area.papers.map((paper, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-gray-400">
                          <FileText className="h-4 w-4 text-red-500/50" />
                          <span>{paper}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="py-24 bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-light">Latest in wire84 Field of Research</h2>
            <button className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors font-mono">
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-8">
            {recentPublications.map((pub, index) => (
              <div 
                key={index}
                className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6 hover:border-red-500/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-medium mb-2">{pub.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                      <div>{pub.authors.join(', ')}</div>
                      <span className="text-red-500/30">•</span>
                      <div>{pub.date}</div>
                      <span className="text-red-500/30">•</span>
                      <div>{pub.venue}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <MessageSquare className="h-4 w-4" />
                    <span>{pub.citations}</span>
                  </div>
                </div>
                
                <p className="text-gray-400 mb-4">{pub.abstract}</p>
                
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-sm text-red-500 hover:text-red-400 transition-colors">
                    <FileText className="h-4 w-4" />
                    <span>Read Paper</span>
                  </button>
                  <button className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <Code className="h-4 w-4" />
                    <span>View Code</span>
                  </button>
                  <button className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <Database className="h-4 w-4" />
                    <span>Dataset</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-light">Open Source Contributions</h2>
            <button className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors font-mono">
              <span>GitHub</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: GitBranch,
                title: 'LLM-Trader',
                description: 'Open-source framework for building LLM-based trading strategies.',
                stats: { stars: 1240, forks: 326 }
              },
              {
                icon: Database,
                title: 'Social Sentiment Dataset',
                description: 'Curated dataset of tweet sentiments and market reactions.',
                stats: { size: '47GB', downloads: 8520 }
              },
              {
                icon: Layers,
                title: 'Neural Trading Models',
                description: 'Collection of pre-trained neural architectures for trading.',
                stats: { models: 12, stars: 892 }
              }
            ].map((project, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl border border-gray-800/50 hover:border-red-500/30 transition-all duration-300 bg-gray-900/30"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <project.icon className="h-6 w-6 text-red-500" />
                  <h3 className="text-lg font-medium">{project.title}</h3>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  {project.stats.stars && (
                    <div className="flex items-center space-x-1">
                      <span>★</span>
                      <span>{project.stats.stars}</span>
                    </div>
                  )}
                  {project.stats.forks && (
                    <div className="flex items-center space-x-1">
                      <span>⑂</span>
                      <span>{project.stats.forks}</span>
                    </div>
                  )}
                  {project.stats.size && (
                    <div>{project.stats.size}</div>
                  )}
                  {project.stats.downloads && (
                    <div>↓ {project.stats.downloads}</div>
                  )}
                  {project.stats.models && (
                    <div>{project.stats.models} models</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl p-8 md:p-12 border border-red-500/20">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-light mb-4">
                Collaborate with our research team
              </h2>
              <p className="text-gray-400 mb-8">
                We're always looking for talented researchers to join our team. If you're passionate about the intersection of AI and finance, we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/waitlist"
                  className="inline-flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-mono text-sm tracking-wider transition-all duration-300"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  <span>Contact Research Team</span>
                </Link>
                <Link
                  to="/waitlist"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-800 hover:border-red-500/30 rounded-lg font-mono text-sm tracking-wider transition-all duration-300"
                >
                  <Microscope className="h-4 w-4 mr-2" />
                  <span>View Open Positions</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <EyeLogo className="w-5 h-5" />
              <span className="text-xs font-mono tracking-[0.2em] text-gray-500">wire84</span>
            </div>
            <p className="text-xs text-gray-600 font-mono tracking-[0.1em]">
              © 2025 wire84. Research advancing quantitative finance.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ResearchPage;