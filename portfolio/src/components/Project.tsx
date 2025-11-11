import React, { useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, HardHat, Code } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import gnn_architecture from '../assets/gnn_architecture.png';
import ablation_charts from '../assets/ablation charts.png';
import hmr from '../assets/hmr.png';

const StyledMarkdown = ({ content }) => {
    return (
        <div className="prose max-w-none">
            <style jsx>{`
        .prose {
            color: #333;
            line-height: 1.8;
        }
        
        .prose h1,
        .prose h2,
        .prose h3,
        .prose h4,
        .prose h5,
        .prose h6 {
          color: #647FBC;
          font-weight: 600;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        
        .prose h1 {
          font-size: 2em;
          border-bottom: 3px solid #647FBC;
          padding-bottom: 0.3em;
        }
        
        .prose h2 {
          font-size: 1.5em;
          border-bottom: 2px solid #647FBC;
          padding-bottom: 0.2em;
        }
        
        .prose a {
          color: #647FBC;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        
        .prose a:hover {
          border-bottom-color: #647FBC;
        }
        
        .prose strong {
          color: #647FBC;
          font-weight: 600;
        }
        
        .prose code {
          background: #f5f7fb;
          color: #647FBC;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-size: 0.9em;
        }
        
        .prose pre {
          background: #f5f7fb;
          border-left: 4px solid #647FBC;
          padding: 1em;
          border-radius: 4px;
          overflow-x: auto;
        }
        
        .prose pre code {
          background: transparent;
          padding: 0;
          color: #333;
        }
        
        .prose blockquote {
          border-left: 4px solid #647FBC;
          padding-left: 1em;
          margin-left: 0;
          color: #555;
          font-style: italic;
        }
        
        .prose ul {
            list-style-type: disc;
            padding-left: 1.5rem;
        }
        
        .prose ol {
            list-style-type: decimal;
            padding-left: 1.5rem;
        }
        
        .prose li::marker {
          color: #647FBC;
        }
        
        .prose hr {
          border: none;
          border-top: 2px solid #647FBC;
          opacity: 0.3;
          margin: 2em 0;
        }
        
        .prose table {
          border-collapse: collapse;
          width: 100%;
            margin-top: 1.5em;
            margin-bottom: 1.5em;
        }
        
        .prose th {
          background: #647FBC;
          color: white;
          padding: 0.75em;
          text-align: left;
        }
        
        .prose td {
          border: 1px solid #ddd;
          padding: 0.75em;
        }
        
        .prose tr:hover {
          background: #f5f7fb;
        }
      `}</style>

            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content || "Detailed description coming soon!"}
            </ReactMarkdown>
        </div>
    );
};

// --- PROJECT DATA (Mock Data for Demonstration) ---
const projectsData = [
    // {
    //     id: 1,
    //     title: "🧪 UBC Organic Chemistry AI Tutor",
    //     shortDescription: "\"AI sucks at chemistry\" - my prof. MUSIC TO MY EARS. A pipeline that processed organic chemistry problems into data structures and allows an AI tutor agent to accurately help students with their homework questions.",
    //     longDescription: "The challenge of teaching complex subjects like Organic Chemistry led to the development of this project. It leverages advanced Natural Language Processing (NLP) techniques to convert textual chemistry problems into computable data structures (e.g., molecular graphs and reaction mechanisms). The AI tutoring agent uses this structured data to provide step-by-step guidance and correction, moving beyond superficial LLM answers.",
    //     techStack: ["React", "Python", "NLP", "GraphQL", "RDKit"],
    //     images: [
    //         "https://placehold.co/400x200/919191/ffffff?text=Chem+Tutor+UI+1",
    //         "https://placehold.co/400x200/648194/ffffff?text=Mechanism+Visualization",
    //         "https://placehold.co/400x200/C3D2DB/000000?text=Data+Pipeline+Flow"
    //     ]
    // },
    {
        id: 2,
        title: "🖥️ Volunteer Management App",
        shortDescription: "This project helps streamline volunteer coordination for community organizations. Built with React, AWS Lambda and DynamoDB for a serverless architecture, efficiently stores and manages volunteer information, making scheduling and communication seamless.",
        longDescription: `## Project Description
        
This Volunteer Management App is designed to streamline the coordination and scheduling of volunteers for community organizations. It features an intuitive React frontend for easy interaction, backed by AWS Lambda functions for serverless processing and DynamoDB for scalable data storage.
        
        `,
        techStack: ["React", "AWS Lambda", "DynamoDB", "OCR", "Tailwind CSS"],
        images: [
            "https://placehold.co/400x200/919191/ffffff?text=Volunteer+Dashboard",
            "https://placehold.co/400x200/648194/ffffff?text=Schedule+Upload+UI",
            "https://placehold.co/400x200/C3D2DB/000000?text=Mobile+View"
        ]
    },
    {
        id: 3,
        title: "📊 GNN Model for Classifying Surgical Videos",
        shortDescription: "A research project on Graphical Neural Network applications on surgical operating room videos. This model classifies videos with 6 phases and 5 transition points achieving an f1-score of 80 on preliminary trials. ",
        longDescription: `## Introduction

This research explores Graph Convolutional Networks (GNNs) applications on surgical operating room (OR) videos.

**Problem:** Video review in hospitals is labour-intensive and difficult to scale.

We propose an AI-enabled, computer-vision–based method for analyzing operating room videos.

Facing video data, GNNs were chosen over CNNs to classify surgical phases and transition points with consideration of our dataset—92 endovascular surgery procedures recorded from a stationary camera in the corner of the room. Intuitively, any meaningful patterns would come from the surgical team's movement and actions. To capture this, we extracted 3D joint positions using the [Human Mesh Recovery (HMR) Model](https://akanazawa.github.io/hmr/), following the approach of [Benjamin Liu in *A human mesh-centered approach to action recognition in the operating room*](https://www.oaepublish.com/articles/ais.2024.19).

### Technical Rationale for Using GNNs

Traditional convolutional neural networks (CNNs) operate on pixel grids and learn visual features such as texture, color, and edges. In surgical videos, these visual cues are often noisy or irrelevant—lighting, shadows, and camera perspective vary, while much of the scene remains static. The information that matters most comes from **how people move**, not how the image looks.

By using the 3D joint coordinates extracted from HMR, we can represent each person's motion as a **graph**: joints are nodes, and edges define spatial relationships between them. A Graph Neural Network learns directly from this structure, combining information across connected joints to recognize patterns of coordinated motion.

This makes GNNs well-suited for our task for three main reasons:

1. **Focus on movement over appearance.**
   
   The model learns from motion data instead of raw video pixels, reducing sensitivity to lighting, occlusion, and visual clutter in the operating room.

2. **Structured representation of team activity.**
   
   Representing poses as graphs captures spatial organization among team members and allows the model to learn patterns of coordination that correspond to surgical phases.

3. **Spatio-temporal understanding.**
   
   Extending GNNs over time (Spatio-Temporal GNNs) allows the model to interpret how configurations evolve across frames, which is critical for detecting phase transitions.

In short, while CNNs focus on what appears in the frame, GNNs focus on **how people move within it**—a more direct signal of surgical workflow and team activity.

## Methodology

**Data Pipeline**

**Data:** 92 endovascular surgery videos processed to joints in 3D and object tracking for each individual.

**Preprocessing:** Phase and transition labels were aligned to each video segment. We applied masking for consistent dimensions across samples and filtered for unreasonable tracklet changes across frames to ensure temporal consistency.

**Feature extraction:** We identified and computed metrics designed to quantify team dynamics and distinguish between surgical phases, including:

- hand-tool interaction event
- individual attention event
- group attention event
- individual traversal
- group traversal

**Graph Construction and Connectivity:** We began with standard human-skeleton connectivity between joints and explored alternate graph configurations in ablation studies to evaluate their effect on model performance.

### Model Architecture

### Training Setup

- **Loss Function:** BCE (Binary Cross-Entropy)
- **Optimizer and HPs:** Adam, n_layers = 5, c_hidden = 128, learning_rate = 0.001
- **Data Augmentation Strategy:** Randomly sampled temporal segments from input videos
- **Evaluation Metric:** Best 2 runs

| Metric | Best | 2nd Best |
|--------|-------| -------|
| F1 | 0.80143 | 0.80121 |
| Precision | 0.79526 | 0.79552 |
| Recall | 0.81019 | 0.81019 |
| Accuracy | 0.81019 | 0.81019 |

- Version Control done on GitHub
- Experiments tracked with Weights & Biases

## Results and Insights

We implemented and compared both **Graph Convolutional Networks (GCN)** and **Graph Attention Networks (GAT)**.

GAT yielded better results, achieving an F1 score of 0.80 and accuracy of 0.81 on the best run. The attention mechanism in GAT allows the model to **assign different weights to each neighboring node**, enabling it to focus on the most relevant joint relationships rather than treating all connections equally as in standard GCNs. This likely contributed to its improved performance.

The experiments showed that **graph connectivity** — how joints are linked and how information propagates — had the most significant influence on performance. Adjusting connectivity improved both recall and F1, confirming that the way spatial structure is encoded is central to modeling human motion effectively.

While these results are promising for a preliminary study, there remains a gap compared to human-level recognition (~95% accuracy). Future work will need to explore temporal modeling and higher-level representations of team activity to bridge this gap.

## Ablations and Comparisons

Feature ablation studies were conducted to evaluate the contribution of individual features to model performance.

Model ablation studies examined the impact of various hyperparameters, including learning rate optimization, on overall results.

## Personal Takeaways and Future Work

- Explore how **edges could encode richer information**, such as learned attention weights or kinematic relationships, to improve expressiveness.
- Design a more systematic exploration of **model architectures and hyperparameters** to identify optimal graph depth and connectivity.
- Extend **feature extraction** to include new behavioral or spatial features — for example, proximity-based team clustering or motion intensity metrics.
- Investigate **temporal aggregation mechanisms** (e.g., Transformer or temporal pooling) to capture longer-term dependencies across surgical phases.
- Incorporate the extracted features into the input data by embedding into nodes or edges. `,
        techStack: ["PyTorch", "GNNs", "Computer Vision", "Python"],
        images: [
            gnn_architecture,
            ablation_charts,
            hmr
        ]
    },
];

// --- Sub Component: Image Slider for Cards ---
const ImageSlider = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = useCallback((e) => {
        e.stopPropagation(); // Important: Prevent card click when clicking controls
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevImage = useCallback((e) => {
        e.stopPropagation(); // Important: Prevent card click when clicking controls
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Auto-slide effect (optional, commented out for user interaction focus)
    // useEffect(() => {
    //     const interval = setInterval(nextImage, 5000);
    //     return () => clearInterval(interval);
    // }, [nextImage]);

    return (
        <div className="w-full h-40 bg-gray-200 relative overflow-hidden rounded-md group">
            <img
                src={images[currentImageIndex]}
                alt={`Project image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain transition-opacity duration-500"
                style={{ opacity: 1 }}
                onError={(e) => (e.currentTarget.src = "https://placehold.co/400x200/EDF6FB/648194?text=Image+Load+Error")}
            />

            {/* Navigation Buttons (Fade in on hover) */}
            <div className="absolute inset-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={prevImage}
                    aria-label="Previous image"
                    className="p-1 bg-gray-500 bg-opacity-30 text-white rounded-r-lg hover:bg-opacity-50 transition"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={nextImage}
                    aria-label="Next image"
                    className="p-1 bg-gray-500 bg-opacity-30 text-white rounded-l-lg hover:bg-opacity-50 transition"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
            {/* Indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                            index === currentImageIndex ? 'bg-white' : 'bg-gray-400 bg-opacity-75'
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

// --- Sub Component: Project Detail Modal ---
const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    // A separate, simple slider for the modal for focus
    const [modalImageIndex, setModalImageIndex] = useState(0);

    const nextModalImage = () => {
        setModalImageIndex((prev) => (prev + 1) % project.images.length);
    };

    const prevModalImage = () => {
        setModalImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    };


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={onClose}
        >
            <div
                className="bg-white w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl p-6 md:p-10 overflow-y-auto transform scale-95 opacity-0 animate-modal-open"
                onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition z-50"
                >
                    <X size={24} />
                </button>

                <h2 className="text-3xl font-bold text-[#647FBC] mb-2">{project.title}</h2>
                <div className="text-sm text-gray-500 mb-6 flex items-center">
                    <HardHat size={16} className="mr-1"/> Project Details
                </div>

                {/* Modal Image Slider */}
                <div className="relative mb-6 h-96 w-full rounded-lg overflow-hidden">
                    <img
                        src={project.images[modalImageIndex]}
                        alt={`${project.title} - Image ${modalImageIndex + 1}`}
                        className="w-full h-full object-contain transition-opacity duration-500"
                        onError={(e) => (e.currentTarget.src = "https://placehold.co/800x400/EDF6FB/648194?text=Image+Load+Error")}
                    />
                    <button
                        onClick={prevModalImage}
                        aria-label="Previous image"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-500 bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextModalImage}
                        aria-label="Next image"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-500 bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition"
                    >
                        <ChevronRight size={24} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex">
                        {project.images.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => setModalImageIndex(index)}
                                className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 mx-1 ${
                                    index === modalImageIndex ? 'bg-white ring-2 ring-[#FAFDD6]' : 'bg-gray-400 bg-opacity-75'
                                }`}
                            ></div>
                        ))}
                    </div>
                </div>

                {/* Tech Stack */}
                <h3 className="text-xl font-semibold text-[#647FBC] flex items-center mb-3">
                    <Code size={20} className="mr-2"/> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-[#D3DFE7] text-[#475569] rounded-full text-sm font-medium transition duration-300 hover:bg-[#91ADC8] hover:text-white">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Long Description */}
                <StyledMarkdown content={project.longDescription}></StyledMarkdown>

                {/*  contact  */}
                <div className="mt-16 text-gray-400">
                    For questions or more information, feel free to email to leiahjchen@gmail.com.
                </div>
            </div>
        </div>
    );
};


const Project: React.FC = () => {
    // State to hold the project selected for the modal
    const [selectedProject, setSelectedProject] = useState(null);

    // Function to open the modal
    const openModal = (project) => {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    };

    // Function to close the modal
    const closeModal = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'unset';
    };

    return (
        <>
            <style>
                {`
                /* Custom Keyframe for Modal Opening */
                @keyframes modal-open-kf {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-modal-open {
                    animation: modal-open-kf 0.3s ease-out forwards;
                }
                `}
            </style>
            <section id="project">
                <div className="w-screen min-h-screen bg-gray-100 flex flex-col items-center justify-center py-16 text-black kaisei-decol-regular">
                    {/*<h1 className="text-4xl font-bold text-[#648194] mb-12">Featured Projects</h1>*/}
                    <div className="flex flex-wrap gap-16 items-stretch justify-center w-full max-w-6xl px-4">
                        {projectsData.map((project) => (
                            <div
                                key={project.id}
                                onClick={() => openModal(project)}
                                className="w-full sm:w-[300px] bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col"
                            >
                                <ImageSlider images={project.images} />

                                <div className="flex flex-col flex-grow">
                                        <div className="text-xl mt-3 mb-2 font-bold text-[#647FBC] lexend-deca-normal">{project.title}</div>
                                    <div className="text-sm text-gray-700 flex-grow">
                                        {project.shortDescription}
                                    </div>
                                    <div className="mt-4 text-sm font-medium text-[#647FBC] flex items-center justify-end">
                                        see how I built it  →
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Render the modal */}
            <ProjectModal project={selectedProject} onClose={closeModal} />
        </>
    );
};

export default Project;
