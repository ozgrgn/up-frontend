import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RestService {
  apiUrl: String = environment.apiUrl;

  constructor(private http: HttpClient) {}
  run() {
    return this.http.get(`${this.apiUrl}`);
  }
  getUser(userId: String) {
    return this.http.get(`${this.apiUrl}/user/${userId}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }
  updateUser(user: any) {
    return this.http.put(
      `${this.apiUrl}/user/${user._id}`,
      { user },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }

  addCategory(category: String) {
    return this.http.post(
      `${this.apiUrl}/product/category`,
      {
        category,
      },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }

  getCategories() {
    return this.http.get(`${this.apiUrl}/product/categories`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }



  updateCategory(category: any) {
    return this.http.put(
      `${this.apiUrl}/product/category`,
      { category },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }

  addProduct(category:String,product: String) {
    return this.http.post(
      `${this.apiUrl}/product/product/${category}`,
      {
        product
      },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }
  deleteCategory(id: any) {
    return this.http.delete(`${this.apiUrl}/product/category/${id}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }
// CAMPAIGNS
  getCampaigns() {
    return this.http.get(`${this.apiUrl}/others/campaigns`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  addCampaign(campaign: String) {
    return this.http.post(
      `${this.apiUrl}/others/campaign`,
      {
        campaign,
      },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }
  deleteCampaign(id: any) {
    return this.http.delete(`${this.apiUrl}/others/campaign/${id}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  
// CAMPAIGNS
getReasons() {
  return this.http.get(`${this.apiUrl}/others/reasons`, {
    headers: new HttpHeaders({
      Authorization: localStorage.getItem("token"),
    }),
  });
}

addReason(reason: String) {
  return this.http.post(
    `${this.apiUrl}/others/reason`,
    {
      reason,
    },
    {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    }
  );
}
deleteReason(id: any) {
  return this.http.delete(`${this.apiUrl}/others/reason/${id}`, {
    headers: new HttpHeaders({
      Authorization: localStorage.getItem("token"),
    }),
  });
}


getAirlines() {
  return this.http.get(`${this.apiUrl}/others/airlines`, {
    headers: new HttpHeaders({
      Authorization: localStorage.getItem("token"),
    }),
  });
}
getAirports() {
  return this.http.get(`${this.apiUrl}/others/airports`, {
    headers: new HttpHeaders({
      Authorization: localStorage.getItem("token"),
    }),
  });
}
getAgencies() {
  return this.http.get(`${this.apiUrl}/others/agencies`, {
    headers: new HttpHeaders({
      Authorization: localStorage.getItem("token"),
    }),
  });
}















  addLawsuit(
    contractDate: String,
    finishDate: String,
    dtype: String,
    type?: any,
    description?: String,
    price?: Number,
    lawyers?: any[],
    agents?: any[],
    clients?: any[],
    uyapNo?: String,
    status?: Boolean,
    dealPrice?: Number,
    appNo?: String,
    result?: String,
    office?: String,
    id?: String,
    closed?: Boolean,
    creator?: String
  ) {
    return this.http.post(
      `${this.apiUrl}/lawsuit`,
      {
        contractDate,
        finishDate,
        dtype,
        type,
        description,
        price,
        lawyers,
        agents,
        clients,
        uyapNo,
        status,
        dealPrice,
        appNo,
        result,
        office,
        id,
        closed,
        creator,
      },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }

  getLawsuits(
    limit?: number,
    skip?: number,
    user?: String,
    status?: Boolean,
    sort?: Object,
    startDate?: String,
    endDate?: String,
    startDate2?: String,
    endDate2?: String,
    type?: String,
    dtype?: String,
    closed?: Boolean,
    result?: String,
    client?: String,
    lawyer?: String,
    agent?: String,
    who?: String,
    lawyerOrAgent?: Boolean,
    uyapNo?: String,
    creator?: String
  ) {
    let query: any = {};
    if (limit) {
      query.limit = limit;
    }
    if (skip) {
      query.skip = skip;
    }
    if (user) {
      query.user = user;
    }
    if (startDate) {
      query.startDate = startDate;
    }
    if (endDate) {
      query.endDate = endDate;
    }
    if (startDate2) {
      query.startDate2 = startDate2;
    }
    if (endDate2) {
      query.endDate2 = endDate2;
    }
    if (status) {
      query.status = status;
    }
    if (type) {
      query.type = type;
    }
    if (dtype) {
      query.dtype = dtype;
    }
    if (dtype) {
      query.dtype = dtype;
    }
    if (closed) {
      query.closed = closed;
    }
    if (result) {
      query.result = result;
    }
    if (client) {
      query.client = client;
    }
    if (lawyer) {
      query.lawyer = lawyer;
    }
    if (agent) {
      query.agent = agent;
    }
    if (who) {
      query.who = who;
    }
    if (lawyerOrAgent) {
      query.lawyerOrAgent = lawyerOrAgent;
    }
    if (uyapNo) {
      query.uyapNo = uyapNo;
    }
    if (sort) {
      query.sort = JSON.stringify(sort);
    }
    if (creator) {
      query.creator = creator;
    }

    return this.http.get(`${this.apiUrl}/lawsuit`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
      params: query,
    });
  }

  getLawsuit(lawsuitId: String) {
    return this.http.get(`${this.apiUrl}/lawsuit/${lawsuitId}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }
  updateLawsuit(lawsuit: any) {
    return this.http.put(
      `${this.apiUrl}/lawsuit/${lawsuit._id}`,
      { lawsuit },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }
  getResults() {
    return this.http.get(`${this.apiUrl}/others/results`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }
  getTypes() {
    return this.http.get(`${this.apiUrl}/others/types`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }
  getDtypes() {
    return this.http.get(`${this.apiUrl}/others/dtypes`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  getGeneralSettings() {
    return this.http.get(`${this.apiUrl}/settings`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  updateGeneralSettings(settings: any) {
    return this.http.put(
      `${this.apiUrl}/settings`,
      { settings },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }
  addContractSettings(
    startDate: String,
    endDate: String,
    lawyerComm?: Number,
    agentComm?: Number,
    kdv?: Number,
    stopaj?: Number
  ) {
    return this.http.post(
      `${this.apiUrl}/contractsettings`,
      {
        startDate,
        endDate,
        lawyerComm,
        agentComm,
        kdv,
        stopaj,
      },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }
  getContractSettings() {
    return this.http.get(`${this.apiUrl}/contractsettings`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }
  getLawsuitContractSettings(contractDate?: any) {
    console.log(contractDate, "rest contractDate");
    return this.http.get(`${this.apiUrl}/contractsettings/lawsuit`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
      params: { contractDate },
    });
  }
  updateContractSettings(contractSettings: any) {
    return this.http.put(
      `${this.apiUrl}/contractSettings`,
      { contractSettings },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }
  deleteContractSettings(id: any) {
    return this.http.delete(`${this.apiUrl}/contractsettings/${id}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }
  changeProcess(lawsuitId, userId, newProcess, who) {
    return this.http.post(
      `${this.apiUrl}/lawsuit/${lawsuitId}/changeprocess`,
      { userId, newProcess, who },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }
  changeStatus(userId, newUserStatus?, newStatus?) {
    return this.http.post(
      `${this.apiUrl}/user/${userId}/changestatus`,
      { userId, newStatus, newUserStatus },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }

  getMails() {
    return this.http.get(`${this.apiUrl}/mail`);
  }

  addOwner(
    name: String,
    tc: String,
    related_no: String,
    post_address: String,
    home_address: String,
    home_phone: String,
    work_address: String,
    work_phone: String,
    fax_no: String,
    mobile_no: String
  ) {
    return this.http.post(
      `${this.apiUrl}/owner`,
      {
        name,
        tc,
        related_no,
        post_address,
        home_address,
        home_phone,
        work_address,
        work_phone,
        fax_no,
        mobile_no,
      },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }

  addRoom(name: String, sort: Number) {
    return this.http.post(
      `${this.apiUrl}/others/room`,
      {
        name,
        sort,
      },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }
  getRooms() {
    return this.http.get(`${this.apiUrl}/others/rooms`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }
  deleteRoom(roomId: string) {
    return this.http.delete(`${this.apiUrl}/others/room/${roomId}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  addMeeting(startDate: Date, finishDate: Date, room: String, lawsuit: any) {
    console.log(lawsuit, "lawsuit");
    return this.http.post(
      `${this.apiUrl}/others/meeting`,
      {
        startDate,
        finishDate,
        room,
        lawsuit,
      },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }

  getLawsuitMeetings(lawsuitId: String) {
    return this.http.get(`${this.apiUrl}/others/meetings/${lawsuitId}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  getMeetings() {
    return this.http.get(`${this.apiUrl}/others/meetings`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }
  deleteMeeting(id: any) {
    return this.http.delete(`${this.apiUrl}/others/meeting/${id}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  getConflictMeetings(startDate:any,finishDate:any) {
    console.log(startDate,"rest start")
    return this.http.get(`${this.apiUrl}/others/conflicts/${startDate}/${finishDate}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
      params: { startDate,finishDate },
    });
  }



  getDocumentTypes() {
    return this.http.get(`${this.apiUrl}/document/document-types`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  getDocumentTemplates(user: string) {
    return this.http.get(`${this.apiUrl}/document/document-templates`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
      params: { user },
    });
  }

  deleteDocumentTemplate(documentTemplateId: string) {
    return this.http.delete(
      `${this.apiUrl}/document/document-template/${documentTemplateId}`,
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }

  addDocumentTemplate(
    document_type: String,
    name: String,
    content: String,
    isDefault?: Boolean
  ) {
    let data: any = {};

    data.name = name;
    data.content = content;
    if (isDefault || isDefault == false) {
      data.isDefault = isDefault;
    }
    if (document_type) {
      data.document_type = document_type;
    }

    data.user = localStorage.getItem("userId");
    return this.http.post(`${this.apiUrl}/document/document-template`, data, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  updateDocumentTemplate(
    documentTemplateId: string,
    document_type: String,
    name: String,
    content: String
  ) {
    let data: any = {};

    data.name = name;
    data.content = content;

    if (document_type) {
      data.document_type = document_type;
    }
    return this.http.put(
      `${this.apiUrl}/document/document-template/${documentTemplateId}`,
      { documentTemplate: data },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }

  addDocumentReport(document_type: String, name: String, content: String) {
    let data: any = {};

    data.name = name;
    data.content = content;

    if (document_type) {
      data.document_type = document_type;
    }

    data.user = localStorage.getItem("userId");
    return this.http.post(`${this.apiUrl}/document/document-report`, data, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  getDocumentReports(user: string) {
    return this.http.get(`${this.apiUrl}/document/document-reports`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
      params: { user },
    });
  }

  htmlToDocx(content: string) {
    return this.http.post(
      `${this.apiUrl}/document/html-to-docx`,
      { content },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
        responseType: "blob",
      }
    );
  }

  htmlToUdf(content: string) {
    return this.http.post(
      `${this.apiUrl}/document/html-to-udf`,
      { content },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }
}
