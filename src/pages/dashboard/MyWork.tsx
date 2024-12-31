import React from "react";
import Sidebar from "@/layouts/DashSlidebar";
import {
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MyWork: React.FC = () => {
  
  return (
    <div className="bg-slate-200 pt-12 w-full">
      <Sidebar>
        <div>
          <Card
            variant="outlined"
            className="my-3 w-full p-3"
            sx={{ borderRadius: "0.5rem" }}
          >
            <h1 className="text-3xl font-medium">Mi Trabajo</h1>
            <CardContent>
              <Accordion defaultExpanded className="border border-amber-900">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <div>
                      <span className="text-amber-900 font-bold text-lg">Fecha Pasadas</span>
                      <span> (0) Elementos</span>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </AccordionDetails>
              </Accordion>
              <Accordion className="border border-cyan-600 mt-1">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                 <div>
                      <span className="text-cyan-600 font-bold text-lg">Hoy</span>
                      <span> (0) Elementos</span>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </AccordionDetails>
              </Accordion>
              <Accordion className="border border-emerald-400 mt-1">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  <div>
                      <span className="text-emerald-400 font-bold text-lg">Proxima Semana</span>
                      <span> (0) Elementos</span>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </AccordionDetails>
              </Accordion>
              <Accordion className="border border-amber-600 mt-1">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4-content"
                  id="panel4-header"
                >
                  <div>
                      <span className="text-amber-600 font-bold text-lg">Mas adelante</span>
                      <span> (0) Elementos</span>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </AccordionDetails>
              </Accordion>
              <Accordion className="border border-blue-800 mt-1">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel5-content"
                  id="panel5-header"
                >
                  <div>
                      <span className="text-blue-800 font-bold text-lg">Fin fecha</span>
                      <span> (0) Elementos</span>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </Sidebar>
    </div>
  );
};

export default MyWork;
