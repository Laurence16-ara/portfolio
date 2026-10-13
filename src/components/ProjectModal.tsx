import {
  X,
  Mail,
  UserPlus,
  Clock,
  GitBranch,
  Tag,
  ArrowDown,
  ArrowRight,
  Circle,
  FileText,
  Send,
  CalendarCheck,
  ClipboardCheck,
  Trophy,
  Users,
  Inbox,
  CalendarDays,
  Receipt,
  Bell,
  Webhook,
  Search,
  Share2,
  Monitor,
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

/* ================================================================
   Workflow Types
   ================================================================ */

interface WorkflowAction {
  type: "action";
  icon: React.ReactNode;
  label: string;
  description?: string;
}

interface WorkflowCondition {
  type: "condition";
  label: string;
  description: string;
  metBranch: WorkflowNode[];
  noneBranch: WorkflowNode[];
}

interface WorkflowMultiBranch {
  label: string;
  nodes: WorkflowNode[];
}

interface WorkflowMultiCondition {
  type: "multiCondition";
  label: string;
  description?: string;
  branches: WorkflowMultiBranch[];
}

interface WorkflowEnd {
  type: "end";
}

type WorkflowNode =
  WorkflowAction | WorkflowCondition | WorkflowMultiCondition | WorkflowEnd;

interface PipelineStage {
  name: string;
  color: string;
  icon: React.ReactNode;
}

interface SystemStep {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  color: string;
}

interface ProjectLink {
  label: string;
  description: string;
  url: string;
}

interface ProjectData {
  name: string;
  category: string;
  workflow?: WorkflowNode[];
  workflow2?: WorkflowNode[];
  pipeline?: PipelineStage[];
  systemOverview?: SystemStep[];
  liveUrl?: string;
  workflow1Label?: string;
  workflow2Label?: string;
  builtWith?: string[];
  links?: ProjectLink[];
  linksLabel?: string;
}

interface ProjectModalProps {
  open: boolean;
  onClose: () => void;
  project: ProjectData;
}

/* ================================================================
   Workflow Renderer — VERTICAL layout for both desktop and mobile
   ================================================================ */

function VerticalConnector() {
  return (
    <div className="flex flex-col items-center py-0.5 sm:py-1">
      <ArrowDown size={12} className="text-accent/60 sm:hidden" />
      <ArrowDown size={14} className="text-accent/60 hidden sm:block" />
    </div>
  );
}

function ActionCard({ node }: { node: WorkflowAction }) {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 rounded-lg sm:rounded-xl border border-border bg-card px-2.5 sm:px-3.5 py-2 sm:py-2.5 transition-colors hover:border-accent/30 shadow-sm w-full max-w-lg mx-auto">
      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
        {node.icon}
      </div>
      <div className="min-w-0 flex-1">
        <span className="text-[11px] sm:text-[13px] font-medium text-foreground block leading-tight">
          {node.label}
        </span>
        {node.description && (
          <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5 leading-snug">
            {node.description}
          </p>
        )}
      </div>
    </div>
  );
}

function EndPill() {
  return (
    <div className="flex justify-center w-full">
      <div className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 sm:px-4 py-1 sm:py-1.5">
        <Circle
          size={5}
          className="text-muted-foreground fill-current sm:hidden"
        />
        <Circle
          size={6}
          className="text-muted-foreground fill-current hidden sm:block"
        />
        <span className="text-[9px] sm:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          END
        </span>
      </div>
    </div>
  );
}

function ConditionCard({ node }: { node: WorkflowCondition }) {
  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Condition card */}
      <div className="flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border-2 border-accent/30 bg-accent/5 px-2.5 sm:px-4 py-2 sm:py-2.5 shadow-sm w-full">
        <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent flex items-center justify-center text-white">
          <GitBranch size={12} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] sm:text-[13px] font-semibold text-foreground leading-tight">
            {node.label}
          </p>
          <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5 leading-snug">
            {node.description}
          </p>
        </div>
      </div>

      {/* Branch container — side-by-side on ALL screen sizes (desktop layout, scaled down on mobile) */}
      <div className="mt-2.5 flex flex-row items-start gap-2 sm:gap-4">
        {/* LEFT / MAIN BRANCH — Condition Met (continues downward) */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col items-center sm:items-start">
            <ArrowDown
              size={12}
              className="text-emerald-500/60 mb-1 sm:hidden"
            />
            <ArrowDown
              size={14}
              className="text-emerald-500/60 mb-1 hidden sm:block"
            />
            <span className="inline-block text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded mb-1.5 sm:mb-2 border border-emerald-200">
              Condition Met
            </span>
            <div className="w-full">
              <WorkflowVerticalList nodes={node.metBranch} />
            </div>
          </div>
        </div>

        {/* RIGHT BRANCH — None (exits to END) */}
        <div className="flex-shrink-0 w-[80px] sm:w-[100px] flex flex-col items-center">
          <ArrowRight
            size={12}
            className="text-muted-foreground/40 mb-1 sm:hidden"
          />
          <ArrowRight
            size={14}
            className="text-muted-foreground/40 mb-1 hidden sm:block"
          />
          <span className="inline-block text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-muted-foreground bg-muted/60 px-1.5 sm:px-2 py-0.5 rounded mb-1.5 border border-border">
            None
          </span>
          <div className="w-full flex justify-center">
            <EndPill />
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowVerticalList({ nodes }: { nodes: WorkflowNode[] }) {
  return (
    <div className="space-y-0">
      {nodes.map((node, index) => {
        const isLast = index === nodes.length - 1;
        return (
          <div key={index}>
            {node.type === "action" && (
              <>
                <ActionCard node={node} />
                {!isLast && <VerticalConnector />}
              </>
            )}
            {node.type === "condition" && (
              <>
                <ConditionCard node={node} />
                {!isLast && <VerticalConnector />}
              </>
            )}
            {node.type === "multiCondition" && (
              <>
                <MultiConditionCard node={node} />
                {!isLast && <VerticalConnector />}
              </>
            )}
            {node.type === "end" && <EndPill />}
          </div>
        );
      })}
    </div>
  );
}

/* ================================================================
   Multi-Condition Card — handles 3+ named branches
   ================================================================ */

function MultiConditionCard({ node }: { node: WorkflowMultiCondition }) {
  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Condition card */}
      <div className="flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border-2 border-accent/30 bg-accent/5 px-2.5 sm:px-4 py-2 sm:py-2.5 shadow-sm w-full">
        <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent flex items-center justify-center text-white">
          <GitBranch size={12} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] sm:text-[13px] font-semibold text-foreground leading-tight">
            {node.label}
          </p>
          {node.description && (
            <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5 leading-snug">
              {node.description}
            </p>
          )}
        </div>
      </div>

      {/* Branch container — grid layout for multiple branches */}
      <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {node.branches.map((branch, i) => (
          <div key={i} className="flex flex-col items-center min-w-0">
            <ArrowDown size={12} className="text-accent/60 mb-1 sm:hidden" />
            <ArrowDown
              size={14}
              className="text-accent/60 mb-1 hidden sm:block"
            />
            <span
              className={`inline-block text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded mb-1.5 sm:mb-2 border text-center ${
                branch.label === "None"
                  ? "text-muted-foreground bg-muted/60 border-border"
                  : "text-accent bg-accent/10 border-accent/30"
              }`}
            >
              {branch.label}
            </span>
            <div className="w-full">
              <WorkflowVerticalList nodes={branch.nodes} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   System Overview Component — TWO ROWS layout
   ================================================================ */

function SystemOverview({ steps }: { steps: SystemStep[] }) {
  const midPoint = Math.ceil(steps.length / 2);
  const row1 = steps.slice(0, midPoint);
  const row2 = steps.slice(midPoint);

  const renderRow = (rowSteps: SystemStep[]) => (
    <div className="flex flex-row items-center justify-center gap-1 sm:gap-2.5 w-full">
      {rowSteps.map((step, i) => (
        <div key={i} className="flex flex-row items-center gap-1 sm:gap-2.5">
          <div
            className={`flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border ${step.color} bg-card`}
          >
            <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-background flex items-center justify-center text-foreground flex-shrink-0">
              {step.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[8px] sm:text-xs font-semibold text-foreground leading-tight whitespace-nowrap">
                {step.label}
              </p>
              <p className="text-[7px] sm:text-[10px] text-muted-foreground mt-0.5 hidden sm:block">
                {step.sublabel}
              </p>
            </div>
          </div>
          {i < rowSteps.length - 1 && (
            <ArrowRight
              size={10}
              className="text-accent/70 flex-shrink-0 sm:hidden"
            />
          )}
          {i < rowSteps.length - 1 && (
            <ArrowRight
              size={16}
              className="text-accent/70 flex-shrink-0 hidden sm:block"
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-1.5 sm:space-y-2.5">
      {renderRow(row1)}
      {renderRow(row2)}
    </div>
  );
}

/* ================================================================
    Pipeline Component — compact horizontal
   ================================================================ */

function PipelineDisplay({ stages }: { stages: PipelineStage[] }) {
  const midPoint = Math.ceil(stages.length / 2);
  const row1 = stages.slice(0, midPoint);
  const row2 = stages.slice(midPoint);

  const renderRow = (rowStages: PipelineStage[]) => (
    <div className="flex flex-row items-center justify-center gap-1 sm:gap-2.5 w-full">
      {rowStages.map((stage, i) => (
        <div key={i} className="flex flex-row items-center gap-1 sm:gap-2.5">
          <div className="rounded-lg sm:rounded-xl border border-border bg-card p-1.5 sm:p-3 hover:border-accent/20 transition-colors text-center">
            <div
              className={`w-5 h-5 sm:w-9 sm:h-9 rounded-md sm:rounded-lg ${stage.color} flex items-center justify-center text-white flex-shrink-0 mx-auto mb-1 sm:mb-1.5`}
            >
              {stage.icon}
            </div>
            <span className="font-semibold text-[8px] sm:text-xs text-foreground leading-tight block whitespace-nowrap">
              {stage.name}
            </span>
          </div>
          {i < rowStages.length - 1 && (
            <ArrowRight
              size={10}
              className="text-accent/60 self-center flex-shrink-0 sm:hidden"
            />
          )}
          {i < rowStages.length - 1 && (
            <ArrowRight
              size={16}
              className="text-accent/60 self-center flex-shrink-0 hidden sm:block"
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-2 sm:space-y-2.5">
      {renderRow(row1)}
      {renderRow(row2)}
    </div>
  );
}

/* ================================================================
    Tab Configuration
   ================================================================ */

type TabId = "workflow1" | "workflow2" | "pipeline" | "links";

const ALL_TABS: { id: TabId; label: string }[] = [
  { id: "workflow1", label: "Workflow" },
  { id: "workflow2", label: "Workflow 2" },
  { id: "pipeline", label: "CRM Pipeline" },
  { id: "links", label: "Live Funnels" },
];

/* ================================================================
   Project Modal
   ================================================================ */

export const ProjectModal = ({ open, onClose, project }: ProjectModalProps) => {
  const [activeTab, setActiveTab] = useState<TabId>("workflow1");

  // Build tabs dynamically based on available content
  const TABS = ALL_TABS.filter((tab) => {
    if (tab.id === "workflow1")
      return project.workflow && project.workflow.length > 0;
    if (tab.id === "workflow2")
      return project.workflow2 && project.workflow2.length > 0;
    if (tab.id === "pipeline")
      return project.pipeline && project.pipeline.length > 0;
    if (tab.id === "links") return project.links && project.links.length > 0;
    return false;
  });

  // If active tab doesn't exist for this project, fall back to first available
  const effectiveTab = TABS.some((t) => t.id === activeTab)
    ? activeTab
    : TABS[0]?.id;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[92vw] sm:max-w-[85vw] lg:max-w-[920px] max-h-[85vh] overflow-y-auto overflow-x-hidden p-0 bg-background border-border rounded-2xl [&>*]:max-w-full">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-5 sm:px-7 py-4 sm:py-5 flex items-start justify-between gap-3">
          <DialogHeader className="text-left flex-1 min-w-0 space-y-0">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-foreground tracking-tight leading-tight">
              {project.name}
            </DialogTitle>
            <p className="mt-1.5 text-sm sm:text-[15px] text-accent font-medium leading-snug break-words">
              {project.category}
            </p>
          </DialogHeader>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-secondary transition-colors flex-shrink-0 -mt-1"
            aria-label="Close"
          >
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* System Overview — TWO ROWS */}
        <div className="px-5 sm:px-7 pt-5 pb-4 overflow-x-hidden">
          {project.systemOverview && (
            <SystemOverview steps={project.systemOverview} />
          )}
        </div>

        {/* Tab Navigation */}
        <div className="sticky top-[72px] sm:top-[80px] z-10 bg-background/95 backdrop-blur-sm border-y border-border px-5 sm:px-7">
          <div className="flex gap-1 sm:gap-2 justify-center sm:justify-start overflow-x-auto scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${
                  effectiveTab === tab.id
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {/* Tab Content */}
        <div className="px-5 sm:px-7 py-5 sm:py-7 min-h-[250px] overflow-x-hidden">
          {/* Workflow 1 */}
          {effectiveTab === "workflow1" &&
            project.workflow &&
            project.workflow.length > 0 && (
              <section>
                <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2.5 sm:mb-3 text-center">
                  {project.workflow1Label || "Workflow 1"}
                </h3>
                <div className="max-w-lg mx-auto">
                  <WorkflowVerticalList nodes={project.workflow} />
                </div>
              </section>
            )}

          {/* Workflow 2 */}
          {effectiveTab === "workflow2" &&
            project.workflow2 &&
            project.workflow2.length > 0 && (
              <section>
                <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2.5 sm:mb-3 text-center">
                  {project.workflow2Label || "Workflow 2"}
                </h3>
                <div className="max-w-lg mx-auto">
                  <WorkflowVerticalList nodes={project.workflow2} />
                </div>
              </section>
            )}

          {/* CRM Pipeline */}
          {effectiveTab === "pipeline" &&
            project.pipeline &&
            project.pipeline.length > 0 && (
              <section>
                <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2.5 sm:mb-3 text-center">
                  CRM Pipeline
                </h3>
                <PipelineDisplay stages={project.pipeline} />
              </section>
            )}

          {/* Live Funnels */}
          {effectiveTab === "links" &&
            project.links &&
            project.links.length > 0 && (
              <section>
                <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2.5 sm:mb-3 text-center">
                  {project.linksLabel || "Live Funnels"}
                </h3>
                <div className="max-w-lg mx-auto space-y-3">
                  {project.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 transition-all hover:border-accent/40 hover:shadow-md group"
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                        <Monitor size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground leading-tight">
                          {link.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                          {link.description}
                        </p>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-accent flex-shrink-0 transition-transform group-hover:translate-x-0.5"
                      />
                    </a>
                  ))}
                </div>
              </section>
            )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border px-5 sm:px-7 py-3.5 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 overflow-x-hidden">
          <div className="flex items-center gap-2.5 min-w-0 w-full sm:w-auto">
            <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText size={14} className="text-primary" />
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                Built With
              </span>
              {(
                project.builtWith || [
                  "GoHighLevel",
                  "Workflows",
                  "Pipelines",
                  "Tags",
                  "Email Automation",
                ]
              ).map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-[10px] px-2 py-0.5 font-medium whitespace-nowrap"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-accent hover:bg-accent-hover text-white rounded-xl font-medium text-sm transition-all hover:scale-[1.02] flex-shrink-0"
            >
              View Live Site →
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

/* ================================================================
   Apex Roofing Data — faithful to actual GHL workflow screenshots
   ================================================================ */

export const apexRoofingData: ProjectData = {
  name: "Apex Roofing",
  category: "Lead Generation & Appointment Automation",
  liveUrl: "https://apex-roofing-guide.laurencemaligaya.com/",
  workflow1Label: "Lead Generation & Nurturing",
  workflow2Label: "Booked Leads & Appointment Reminders",

  systemOverview: [
    {
      icon: <FileText size={15} />,
      label: "Lead Capture",
      sublabel: "Forms & Guides",
      color: "border-blue-200",
    },
    {
      icon: <Send size={15} />,
      label: "Nurturing",
      sublabel: "Follow-up Emails",
      color: "border-purple-200",
    },
    {
      icon: <CalendarDays size={15} />,
      label: "Appointment",
      sublabel: "Inspection Booking",
      color: "border-amber-200",
    },
    {
      icon: <Bell size={15} />,
      label: "Reminders",
      sublabel: "Email Reminders",
      color: "border-cyan-200",
    },
    {
      icon: <ClipboardCheck size={15} />,
      label: "Inspection",
      sublabel: "On-site Inspection",
      color: "border-emerald-200",
    },
    {
      icon: <Trophy size={15} />,
      label: "Won",
      sublabel: "Happy Customer",
      color: "border-green-200",
    },
  ],

  // Workflow 1 — Lead Generation & Nurturing
  workflow: [
    { type: "action", icon: <FileText size={14} />, label: "Form Submitted" },
    {
      type: "action",
      icon: <Mail size={14} />,
      label: "Free Roofing Guide Email",
    },
    { type: "action", icon: <Tag size={14} />, label: "Add roofing-lead Tag" },
    {
      type: "action",
      icon: <UserPlus size={14} />,
      label: "Create Opportunity → New Lead",
    },
    { type: "action", icon: <Clock size={14} />, label: "Wait for 1 Day" },
    {
      type: "condition",
      label: "Condition 1",
      description: 'Tags does not include "inspection-booked"',
      metBranch: [
        {
          type: "action",
          icon: <Tag size={14} />,
          label: "Move Lead to Nurturing Stage",
        },
        {
          type: "action",
          icon: <Mail size={14} />,
          label: "2nd Follow-Up Email",
        },
        { type: "action", icon: <Tag size={14} />, label: "Add Tag" },
        { type: "action", icon: <Clock size={14} />, label: "Wait for 3 Days" },
        {
          type: "condition",
          label: "Condition 2",
          description: 'Tags does not include "inspection-booked"',
          metBranch: [
            {
              type: "action",
              icon: <Mail size={14} />,
              label: "3rd Follow-Up Email",
            },
            { type: "end" },
          ],
          noneBranch: [{ type: "end" }],
        },
      ],
      noneBranch: [{ type: "end" }],
    },
  ],

  // Workflow 2 — Booked Leads & Appointment Reminders
  workflow2: [
    {
      type: "action",
      icon: <CalendarCheck size={14} />,
      label: "Customer Booked Appointment",
      description: "Trigger: Calendar event booked",
    },
    {
      type: "action",
      icon: <Tag size={14} />,
      label: "Add inspection-scheduled Tag",
    },
    {
      type: "action",
      icon: <UserPlus size={14} />,
      label: "Move to Inspection Booked Stage",
    },
    { type: "action", icon: <Mail size={14} />, label: "Confirmation Email" },
    {
      type: "action",
      icon: <Bell size={14} />,
      label: "Internal Notification",
    },
    { type: "action", icon: <Clock size={14} />, label: "Wait for 1 Day" },
    {
      type: "action",
      icon: <Mail size={14} />,
      label: "Email Reminder 1 Day Before Inspection",
    },
    { type: "action", icon: <Clock size={14} />, label: "Wait" },
    {
      type: "action",
      icon: <Mail size={14} />,
      label: "Email Reminder on Day of Inspection",
    },
    { type: "end" },
  ],

  pipeline: [
    { name: "New Lead", color: "bg-slate-400", icon: <Users size={15} /> },
    { name: "Nurturing", color: "bg-blue-400", icon: <Inbox size={15} /> },
    {
      name: "Inspection Booked",
      color: "bg-green-500",
      icon: <CalendarCheck size={15} />,
    },
    {
      name: "Inspection Completed",
      color: "bg-purple-500",
      icon: <ClipboardCheck size={15} />,
    },
    {
      name: "Estimate Sent",
      color: "bg-orange-400",
      icon: <Receipt size={15} />,
    },
    { name: "Won", color: "bg-emerald-500", icon: <Trophy size={15} /> },
  ],
};

/* ================================================================
   TrueCare Dental Data — faithful to actual GHL workflow screenshots
   ================================================================ */

export const trueCareDentalData: ProjectData = {
  name: "TrueCare Dental",
  category: "Lead Generation & Consultation Automation",
  liveUrl: "https://truecare-dental.laurencemaligaya.com/",
  workflow1Label: "Consultation Booking & Reminders",

  systemOverview: [
    {
      icon: <FileText size={15} />,
      label: "Lead Capture",
      sublabel: "Service Selection",
      color: "border-blue-200",
    },
    {
      icon: <CalendarDays size={15} />,
      label: "Consultation Booking",
      sublabel: "Calendar Booking",
      color: "border-amber-200",
    },
    {
      icon: <Bell size={15} />,
      label: "Reminders",
      sublabel: "Email Reminders",
      color: "border-cyan-200",
    },
    {
      icon: <ClipboardCheck size={15} />,
      label: "Consultation",
      sublabel: "Patient Visit",
      color: "border-emerald-200",
    },
    {
      icon: <Send size={15} />,
      label: "Follow-Up",
      sublabel: "Post-Visit",
      color: "border-purple-200",
    },
    {
      icon: <Trophy size={15} />,
      label: "Won",
      sublabel: "Happy Patient",
      color: "border-green-200",
    },
  ],

  // Workflow 1 — Consultation Booking & Reminders (linear, no branches)
  workflow: [
    {
      type: "action",
      icon: <CalendarCheck size={14} />,
      label: "Service Booking",
      description:
        'Trigger: Created By / Modified By is "Customer" · In Service Category is "TrueCare Dental"',
    },
    { type: "action", icon: <Mail size={14} />, label: "Confirmation Email" },
    {
      type: "action",
      icon: <Tag size={14} />,
      label: "Add consultation-booked Tag",
    },
    {
      type: "action",
      icon: <UserPlus size={14} />,
      label: "Create Opportunity: New Booking",
    },
    { type: "action", icon: <Clock size={14} />, label: "Wait for a Day" },
    {
      type: "action",
      icon: <Mail size={14} />,
      label: "Email Reminder 1 Day Before Consultation",
    },
    { type: "action", icon: <Clock size={14} />, label: "Wait for 2 Hours" },
    {
      type: "action",
      icon: <Mail size={14} />,
      label: "Email Reminder 2 Hours Before Consultation",
    },
    { type: "end" },
  ],

  pipeline: [
    {
      name: "New Booking",
      color: "bg-slate-400",
      icon: <CalendarDays size={15} />,
    },
    {
      name: "Appointment Confirmed",
      color: "bg-blue-400",
      icon: <CalendarCheck size={15} />,
    },
    {
      name: "Consultation Completed",
      color: "bg-emerald-500",
      icon: <ClipboardCheck size={15} />,
    },
    { name: "Scheduled", color: "bg-purple-500", icon: <Clock size={15} /> },
    { name: "Won", color: "bg-green-500", icon: <Trophy size={15} /> },
    { name: "Lost", color: "bg-red-400", icon: <X size={15} /> },
  ],
};

/* ================================================================
   Vantage Product Systems Data — faithful to actual GHL workflow
   ================================================================ */

export const vantageProductData: ProjectData = {
  name: "Vantage Product Systems",
  category: "Product Sales & Customer Automation",
  liveUrl: "https://product-launch-systems.laurencemaligaya.com/",
  workflow1Label: "Product Sales & Customer Nurturing",

  systemOverview: [
    {
      icon: <FileText size={15} />,
      label: "Lead Capture",
      sublabel: "Form Submitted",
      color: "border-blue-200",
    },
    {
      icon: <Mail size={15} />,
      label: "Confirmation",
      sublabel: "Purchase Email",
      color: "border-amber-200",
    },
    {
      icon: <Receipt size={15} />,
      label: "New Order",
      sublabel: "Opportunity Created",
      color: "border-cyan-200",
    },
    {
      icon: <Send size={15} />,
      label: "Nurturing",
      sublabel: "Product Tips",
      color: "border-purple-200",
    },
    {
      icon: <Trophy size={15} />,
      label: "Completed",
      sublabel: "Customer Delivered",
      color: "border-green-200",
    },
  ],

  // Workflow 1 — Product Sales & Customer Nurturing (linear, no branches)
  workflow: [
    { type: "action", icon: <FileText size={14} />, label: "Form Submitted" },
    { type: "action", icon: <Mail size={14} />, label: "Confirmation Email" },
    {
      type: "action",
      icon: <UserPlus size={14} />,
      label: "Add to New Order Stage",
    },
    {
      type: "action",
      icon: <Tag size={14} />,
      label: "Add customer-digital-product Tag",
    },
    { type: "action", icon: <Clock size={14} />, label: "Wait for 1 Day" },
    {
      type: "action",
      icon: <Mail size={14} />,
      label: "Email for Tips About the Product",
    },
    { type: "action", icon: <Clock size={14} />, label: "Wait for 2 Days" },
    {
      type: "action",
      icon: <Mail size={14} />,
      label: "Another Email for Tips",
    },
    { type: "end" },
  ],

  pipeline: [
    { name: "New Order", color: "bg-slate-400", icon: <Receipt size={15} /> },
    {
      name: "Payment Received",
      color: "bg-blue-400",
      icon: <ClipboardCheck size={15} />,
    },
    {
      name: "Product Delivered",
      color: "bg-purple-500",
      icon: <Send size={15} />,
    },
    { name: "Completed", color: "bg-emerald-500", icon: <Trophy size={15} /> },
  ],
};

/* ================================================================
   FunnelUp Data — Lead Generation & Referral Automation
   ================================================================ */

export const funnelUpData: ProjectData = {
  name: "FunnelUp",
  category: "Lead Generation & Referral Automation",
  liveUrl: "https://funnel-up.laurencemaligaya.com/",
  workflow1Label: "Lead Source Follow-Up",
  workflow2Label: "Send Voucher to Referrer",
  builtWith: [
    "GoHighLevel",
    "Workflows",
    "Conditions",
    "Tags",
    "Webhooks",
    "Email Automation",
  ],

  systemOverview: [
    {
      icon: <FileText size={15} />,
      label: "Lead Capture",
      sublabel: "AI Studio Form",
      color: "border-blue-200",
    },
    {
      icon: <GitBranch size={15} />,
      label: "Source ID",
      sublabel: "Lead Source",
      color: "border-purple-200",
    },
    {
      icon: <Tag size={15} />,
      label: "Tagging",
      sublabel: "Source Tags",
      color: "border-amber-200",
    },
    {
      icon: <Share2 size={15} />,
      label: "Referral",
      sublabel: "Voucher Automation",
      color: "border-emerald-200",
    },
  ],

  // Workflow 1 — Lead Source Follow-Up (multi-branch condition)
  workflow: [
    {
      type: "action",
      icon: <FileText size={14} />,
      label: "AI Studio Form Submitted",
    },
    {
      type: "multiCondition",
      label: "Condition",
      description: "Lead Source",
      branches: [
        {
          label: "Social Media",
          nodes: [
            { type: "action", icon: <Tag size={14} />, label: "Add Tag" },
            {
              type: "action",
              icon: <Share2 size={14} />,
              label: "Social Media",
            },
            { type: "end" },
          ],
        },
        {
          label: "Website Form",
          nodes: [
            { type: "action", icon: <Tag size={14} />, label: "Add Tag" },
            {
              type: "action",
              icon: <Monitor size={14} />,
              label: "Website Form",
            },
            { type: "end" },
          ],
        },
        {
          label: "Referral",
          nodes: [
            { type: "action", icon: <Tag size={14} />, label: "Add Tag" },
            { type: "action", icon: <Share2 size={14} />, label: "Referral" },
            { type: "action", icon: <Webhook size={14} />, label: "Webhook" },
            { type: "end" },
          ],
        },
        {
          label: "None",
          nodes: [{ type: "end" }],
        },
      ],
    },
  ],

  // Workflow 2 — Send Voucher to Referrer
  workflow2: [
    {
      type: "action",
      icon: <Webhook size={14} />,
      label: "Inbound Webhook",
      description: "Get the referrer's email",
    },
    { type: "action", icon: <Search size={14} />, label: "Find Contact" },
    {
      type: "condition",
      label: "Condition",
      description: "Contact lookup result",
      metBranch: [
        { type: "action", icon: <Mail size={14} />, label: "Email" },
        { type: "end" },
      ],
      noneBranch: [{ type: "end" }],
    },
  ],
};

/* ================================================================
   Bemunchie Data — Client Project: SEO Funnel Optimization
   ================================================================ */

export const bemunchieData: ProjectData = {
  name: "Bemunchie SEO Funnel Optimization",
  category: "Mobile & Tablet Responsive Optimization",
  linksLabel: "3 Live Funnels Optimized",
  builtWith: ["GoHighLevel", "Mobile & Tablet", "Responsive Design", "Form QA"],

  systemOverview: [
    {
      icon: <Monitor size={15} />,
      label: "Mobile Audit",
      sublabel: "Responsive Issues",
      color: "border-blue-200",
    },
    {
      icon: <ClipboardCheck size={15} />,
      label: "Layout Fixes",
      sublabel: "Spacing & Structure",
      color: "border-purple-200",
    },
    {
      icon: <FileText size={15} />,
      label: "Form QA",
      sublabel: "Functionality Testing",
      color: "border-amber-200",
    },
    {
      icon: <Trophy size={15} />,
      label: "Optimized",
      sublabel: "Live & Responsive",
      color: "border-green-200",
    },
  ],

  links: [
    {
      label: "Funnel 1 — SEO Landing Page",
      description: "Optimized for mobile and tablet responsiveness",
      url: "https://offer.bemunchie.co.uk/lp-seo",
    },
    {
      label: "Funnel 2 — SEO Jobs Funnel",
      description: "Responsive layout and form functionality fixes",
      url: "https://offer.bemunchie.co.uk/seo-jobs-1k",
    },
    {
      label: "Funnel 3 — Guaranteed Rankings Funnel",
      description: "Mobile spacing and form QA completed",
      url: "https://offer.bemunchie.co.uk/guaranteed-rankings",
    },
  ],
};
