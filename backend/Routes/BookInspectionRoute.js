const express = require("express");
const router = express.Router();
const InspectionRequest = require("../Modals/InspectionRequest");
const Inspector = require("../Modals/Inspector");

// API endpoint to book an inspection
router.post("/book-inspection", async (req, res) => {
  const { postId, userId } = req.body;

  try {
    // Create a new inspection request
    const newRequest = new InspectionRequest({
      postId,
      userId,
      status: "Pending",
    });

    await newRequest.save();

    res.status(200).json({
      success: true,
      message: "Inspection request sent successfully",
    });
  } catch (error) {
    console.error("Error in /book-inspection route:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Get all InspectorRequests Route
router.get("/inspection-requests", async (req, res) => {
  try {
    const requests = await InspectionRequest.find({ status: "Pending" })
      .populate("postId", "adTitle description photos brand model")
      .populate("userId", "name");

    const inspectors = await Inspector.find({}, "name _id");

    console.log(requests);

    res.json({ requests, inspectors });
  } catch (error) {
    console.error("Error in /inspection-requests route:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

//Approve route
router.post("/inspection-requests/:id/approve", async (req, res) => {
  const { id } = req.params;
  const { inspectorId } = req.body;

  try {
    const request = await InspectionRequest.findByIdAndUpdate(
      id,
      { status: "Approved", assignedInspector: inspectorId },
      { new: true }
    );

    res.json({ success: true, request });
  } catch (error) {
    console.error("Error approving inspection request:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

//Delete Route
router.delete("/inspection-requests/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await InspectionRequest.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting inspection request:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

//////////////////////////////////////////
//Below code is for the inspector. This will get the respective assignedInspector data and also save dthe inspectors provided review
//////////////////////////////////////////
router.get("/inspector-requests/:inspectorId", async (req, res) => {
  const { inspectorId } = req.params;

  try {
    const requests = await InspectionRequest.find({
      assignedInspector: inspectorId,
    })
      .populate("postId", "adTitle description photos brand model")
      .populate("userId", "name");

      console.log("Testing: ", requests);

    res.json({ requests });
  } catch (error) {
    console.error("Error in /inspector-requests route:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.put("/inspector-requests/:id", async (req, res) => {
  const { id } = req.params;
  const { inspectionTime, inspectorReview } = req.body;

  try {
    const request = await InspectionRequest.findByIdAndUpdate(
      id,
      { inspectionTime, inspectorReview },
      { new: true }
    );

    res.json({ success: true, request });
  } catch (error) {
    console.error("Error updating inspection request:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

////////////////////////////////
router.get("/inspection-requests/post/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const inspectionRequest = await InspectionRequest.findOne({ postId });

   if(inspectionRequest !== null){
    let inspectorBuyerReview = inspectionRequest.inspectorReview
    let inspectionBuyerTime = inspectionRequest.inspectionTime

    console.log(inspectionBuyerTime)
    console.log(inspectionBuyerRevew)


    return res.json({ inspectorBuyerReview, inspectionBuyerTime });
   }else
   {
    let inspectorBuyerReview = "None"
    let inspectionBuyerTime = ""

    console.log(inspectionBuyerTime)

    return res.json({ inspectorBuyerReview, inspectionBuyerTime });
   }
  } catch (error) {
    console.error("Error fetching inspection request:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
