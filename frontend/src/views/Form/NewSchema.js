export default {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://www.w3id.org/biocompute/1.4.0/schemas/biocomputeobject.json",
    "type": "object",
    "title": "Base type for all BioCompute Objects",
    "description": "All BioCompute object types must adhear to this type in order to be compliant with BioCompute specification",
    "required": [
        "object_id",
        "spec_version",
        "etag",
        "provenance_domain",
        "usability_domain",
        "description_domain",
        "execution_domain",
        "io_domain"
    ],
    "definitions": {
        "object_id": {
            "type": "string",
            "description": "A unique identifier that should be applied to each BCO instance. IDs should never be reused",
            "examples": [
                "https://w3id.org/biocompute/1.4.0/HCV1a.json"
            ]
        },
        "uri": {
            "type": "object",
            "description": "A Uniform Resource Identifer",
            "additionalProperties": false,
            "required": [
                "uri"
            ],
            "properties": {
                "filename": {
                    "type": "string"
                },
                "uri": {
                    "type": "string",
                    "format": "uri"
                },
                "access_time": {
                    "type": "string",
                    "format": "date-time"
                },
                "sha1_checksum": {
                    "type": "string",
                    "description": "value of sha1 checksum of file",
                    "pattern": "[A-Za-z0-9]+"
                }
            }
        }, 
        "contributor": {
            "type": "object",
            "description": "Contributor identifier and type of contribution (determined according to PAV ontology) is required",
            "required": [
                "contribution",
                "name"
            ],
            "additionalProperties": false,
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Name of contributor",
                    "examples": [
                        "Charles Darwin"
                    ]
                },
                "affiliation": {
                    "type": "string",
                    "description": "Organization the particular contributor is affiliated with",
                    "examples": [
                        "HMS Beagle"
                    ]
                },
                "email": {
                    "type": "string",
                    "description": "electronic means for identification and communication purposes",
                    "examples": [
                        "name@example.edu"
                    ],
                    "format": "email"
                },
                "contribution": {
                    "type": "array",
                    "description": "type of contribution determined according to PAV ontology",
                    "reference": "https://doi.org/10.1186/2041-1480-4-37",
                    "items": {
                        "type": "string",
                        "enum": [
                            "authoredBy",
                            "contributedBy",
                            "createdAt",
                            "createdBy",
                            "createdWith",
                            "curatedBy",
                            "derivedFrom",
                            "importedBy",
                            "importedFrom",
                            "providedBy",
                            "retrievedBy",
                            "retrievedFrom",
                            "sourceAccessedBy"
                        ]
                    }
                },
                "orcid": {
                    "type": "string",
                    "description": "Field to record author information. ORCID identifiers allow for the author to curate their information after submission. ORCID identifiers must be valid and must have the prefix ‘https://orcid.org/’",
                    "examples": [
                        "http://orcid.org/0000-0002-1825-0097"
                    ],
                    "format": "uri"
                }
            }
        }
    },
    "additionalProperties": false,
    "properties": {
        "object_id": {
            "type": "string",
            "description": "A unique identifier that should be applied to each BCO instance. IDs should never be reused",
            "examples": [
                "https://w3id.org/biocompute/1.4.0/HCV1a.json"
            ]
            "readOnly": true
        },
        "spec_version": {
            "type": "string",
            "description": "Version of the BCO specification used to define this document",
            "examples": [
                "https://w3id.org/biocompute/spec/v1.2"
            ],
            "readOnly": true,
            "format": "uri"
        },
        "etag": {
            "type": "string",
            "description": "See https://tools.ietf.org/html/rfc7232#section-2.1 for full description. It is recommended that the ETag be deleted or updated if the object file is changed (except in cases using weak ETags in which the entirety of the change comprises a simple re-writing of the JSON).",
            "examples": [
                "5986B05969341343E77A95B4023600FC8FEF48B7E79F355E58B0B404A4F50995"
            ],
            "readOnly": true,
            "pattern": "^([A-Za-z0-9]+)$"
        },
        "provenance_domain": {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "$id": "http://www.w3id.org/biocompute/1.3.0/schemas/provenance_domain.json",
            "type": "object",
            "title": "Provenance Domain",
            "description": "Structured field for tracking data through transformations, including contributors, reviewers, and versioning.",
            "required": [
                "name",
                "version",
                "created",
                "modified",
                "contributors",
                "license"
            ],
            "additionalProperties": false,
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Public searchable name for BioCompute Object. This public field should take free text value using common biological research terminology supporting the terminology used in the usability_domain, external references (xref), and keywords sections.",
                    "examples": [
                        "HCV1a ledipasvir resistance SNP detection"
                    ]
                },
                "version": {
                    "type": "string",
                    "description": "Records the versioning of this BCO instance object. BioCompute Object Version should adhere to semantic versioning as recommended by Semantic Versioning 2.0.0.",
                    "reference": "https://semver.org/",
                    "examples": [
                        "2.9"
                    ]
                },
                "review": {
                    "type": "array",
                    "description": "Description of the current verification status of an object in the review process. The unreviewed flag indicates that the object has been submitted, but no further evaluation or verification has occurred. The in-review flag indicates that verification is underway. The approved flag indicates that the BCO has been verified and reviewed. The suspended flag indicates an object that was once valid is no longer considered valid. The rejected flag indicates that an error or inconsistency was detected in the BCO, and it has been removed or rejected. The fields from the contributor object (described in section 2.1.10) is inherited to populate the reviewer section.",
                    "items": {
                        "type": "object",
                        "required": [
                            "status",
                            "reviewer"
                        ],
                        "additionalProperties": false,
                        "properties": {
                            "date": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "reviewer": {
                                "type": "object",
                                "description": "Contributor identifier and type of contribution (determined according to PAV ontology) is required",
                                "required": [
                                    "contribution",
                                    "name"
                                ],
                                "additionalProperties": false,
                                "properties": {
                                    "name": {
                                        "type": "string",
                                        "description": "Name of contributor",
                                        "examples": [
                                            "Charles Darwin"
                                        ]
                                    },
                                    "affiliation": {
                                        "type": "string",
                                        "description": "Organization the particular contributor is affiliated with",
                                        "examples": [
                                            "HMS Beagle"
                                        ]
                                    },
                                    "email": {
                                        "type": "string",
                                        "description": "electronic means for identification and communication purposes",
                                        "examples": [
                                            "name@example.edu"
                                        ],
                                        "format": "email"
                                    },
                                    "contribution": {
                                        "type": "array",
                                        "description": "type of contribution determined according to PAV ontology",
                                        "reference": "https://doi.org/10.1186/2041-1480-4-37",
                                        "items": {
                                            "type": "string",
                                            "enum": [
                                                "authoredBy",
                                                "contributedBy",
                                                "createdAt",
                                                "createdBy",
                                                "createdWith",
                                                "curatedBy",
                                                "derivedFrom",
                                                "importedBy",
                                                "importedFrom",
                                                "providedBy",
                                                "retrievedBy",
                                                "retrievedFrom",
                                                "sourceAccessedBy"
                                            ]
                                        }
                                    },
                                    "orcid": {
                                        "type": "string",
                                        "description": "Field to record author information. ORCID identifiers allow for the author to curate their information after submission. ORCID identifiers must be valid and must have the prefix ‘https://orcid.org/’",
                                        "examples": [
                                            "http://orcid.org/0000-0002-1825-0097"
                                        ],
                                        "format": "uri"
                                    }
                                }
                                "description": "Contributer that assigns BCO review status."
                            },
                            "reviewer_comment": {
                                "type": "string",
                                "description": "Optional free text comment by reviewer",
                                "examples": [
                                    "Approved by GW staff. Waiting for approval from FDA Reviewer"
                                ]
                            },
                            "status": {
                                "type": "string",
                                "enum": [
                                    "unreviewed",
                                    "in-review",
                                    "approved",
                                    "rejected",
                                    "suspended"
                                ],
                                "description": "Current verification status of the BioCompute Object",
                                "default": "unreviewed"
                            }
                        }
                    }
                },
                "derived_from": {
                    "description": "value of `object_id` field of another BioCompute object",
                    "type": "string",
                    "description": "A unique identifier that should be applied to each BCO instance. IDs should never be reused",
                    "examples": [
                        "https://w3id.org/biocompute/1.4.0/HCV1a.json"
                    ]
                },
                "obsolete_after": {
                    "type": "string",
                    "description": "If the object has an expiration date, this optional field will specify that using the ‘datetime’ type described in ISO-8601 format, as clarified by W3C https://www.w3.org/TR/NOTE-datetime.",
                    "format": "date-time"
                },
                "embargo": {
                    "type": "object",
                    "description": "If the object has a period of time during which it shall not be made public, that range can be specified using these optional fields. Using the datetime type, a start and end time are specified for the embargo.",
                    "additionalProperties": false,
                    "properties": {
                        "start_time": {
                            "type": "string",
                            "description": "Beginning date of embargo period.",
                            "format": "date-time"
                        },
                        "end_time": {
                            "type": "string",
                            "description": "End date of embargo period.",
                            "format": "date-time"
                        }
                    }
                },
                "created": {
                    "type": "string",
                    "description": "Date and time of the BioCompute Object creation",
                    "readOnly": true,
                    "format": "date-time"
                },
                "modified": {
                    "type": "string",
                    "description": "Date and time the BioCompute Object was last modified",
                    "readOnly": true,
                    "format": "date-time"
                },
                "contributors": {
                    "type": "array",
                    "description": "This is a list to hold contributor identifiers and a description of their type of contribution, including a field for ORCIDs to record author information, as they allow for the author to curate their information after submission. The contribution type is a choice taken from PAV ontology: provenance, authoring and versioning, which also maps to the PROV-O.",
                    "items": {
                        "type": "object",
                        "description": "Contributor identifier and type of contribution (determined according to PAV ontology) is required",
                        "required": [
                            "contribution",
                            "name"
                        ],
                        "additionalProperties": false,
                        "properties": {
                            "name": {
                                "type": "string",
                                "description": "Name of contributor",
                                "examples": [
                                    "Charles Darwin"
                                ]
                            },
                            "affiliation": {
                                "type": "string",
                                "description": "Organization the particular contributor is affiliated with",
                                "examples": [
                                    "HMS Beagle"
                                ]
                            },
                            "email": {
                                "type": "string",
                                "description": "electronic means for identification and communication purposes",
                                "examples": [
                                    "name@example.edu"
                                ],
                                "format": "email"
                            },
                            "contribution": {
                                "type": "array",
                                "description": "type of contribution determined according to PAV ontology",
                                "reference": "https://doi.org/10.1186/2041-1480-4-37",
                                "items": {
                                    "type": "string",
                                    "enum": [
                                        "authoredBy",
                                        "contributedBy",
                                        "createdAt",
                                        "createdBy",
                                        "createdWith",
                                        "curatedBy",
                                        "derivedFrom",
                                        "importedBy",
                                        "importedFrom",
                                        "providedBy",
                                        "retrievedBy",
                                        "retrievedFrom",
                                        "sourceAccessedBy"
                                    ]
                                }
                            },
                            "orcid": {
                                "type": "string",
                                "description": "Field to record author information. ORCID identifiers allow for the author to curate their information after submission. ORCID identifiers must be valid and must have the prefix ‘https://orcid.org/’",
                                "examples": [
                                    "http://orcid.org/0000-0002-1825-0097"
                                ],
                                "format": "uri"
                            }
                        }
                    }
                },
                "license": {
                    "type": "string",
                    "description": "Creative Commons license or other license information (text) space. The default or recommended license can be Attribution 4.0 International as shown in example",
                    "examples": [
                        "https://spdx.org/licenses/CC-BY-4.0.html"
                    ]
                }
            }
        },
        "usability_domain": {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "$id": "http://www.w3id.org/biocompute/1.3.0/schemas/usability_domain.json",
            "type": "array",
            "title": "Usability Domain",
            "description": "Author-defined usability domain of the BCO. This field is to aid in search-ability and provide a specific description of the function of the object. It is recommended that a novel use of the BCO could result in the creation of a new entry with a new usability domain",
            "items": {
                "type": "string",
                "description": "Free text values that can accept template language to indicate values from the external_references",
                "examples": [
                    "Identify baseline single nucleotide polymorphisms SNPs [SO:0000694], insertions [so:SO:0000667], and deletions [so:SO:0000045] that correlate with reduced ledipasvir [pubchem.compound:67505836] antiviral drug efficacy in Hepatitis C virus subtype 1 [taxonomy:31646]",
                    "Identify treatment emergent amino acid substitutions [so:SO:0000048] that correlate with antiviral drug treatment failure",
                    "Determine whether the treatment emergent amino acid substitutions [so:SO:0000048] identified correlate with treatment failure involving other drugs against the same virus",
                    "GitHub CWL example: https://github.com/mr-c/hive-cwl-examples/blob/master/workflow/hive-viral-mutation-detection.cwl#L20"
                ]
            }
        },
        "extension_domain": {
            "type": "array",
            "description": "An optional domain that contains user-defined fields.",
            "items":{
                "required":[
                    "extension_schema"
                ],
                "additionalProperties": true,
                "properties": {
                    "extension_schema":{
                        "title": "Extension Schema",
                        "description": "resolving this URI should provide this extension's JSON Schema",
                        "type": "string",
                        "format": "uri"
                    }
                }
            }
        },
        "description_domain": {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "$id": "http://www.w3id.org/biocompute/1.3.0/schemas/description_domain.json",
            "type": "object",
            "title": "Description Domain",
            "description": "Structured field for description of external references, the pipeline steps, and the relationship of I/O objects.",
            "required": [
                "keywords",
                "pipeline_steps"
            ],
            "properties": {
                "keywords": {
                    "type": "array",
                    "description": "Keywords to aid in search-ability and description of the object.",
                    "items": {
                        "type": "string",
                        "description": "This field should take free text value using common biological research terminology.",
                        "examples": [
                            "HCV1a",
                            "Ledipasvir",
                            "antiviral resistance",
                            "SNP",
                            "amino acid substitutions"
                        ]
                    }
                },
                "xref": {
                    "type": "array",
                    "description": "List of the databases or ontology IDs that are cross-referenced in the BCO.",
                    "items": {
                        "type": "object",
                        "description": "External references are stored in the form of prefixed identifiers (CURIEs). These CURIEs map directly to the URIs maintained by Identifiers.org.",
                        "reference": "https://identifiers.org/",
                        "required": [
                            "namespace",
                            "name",
                            "ids",
                            "access_time"
                        ],
                        "properties": {
                            "namespace": {
                                "type": "string",
                                "description": "External resource vendor prefix",
                                "examples": [
                                    "pubchem.compound"
                                ]
                            },
                            "name": {
                                "type": "string",
                                "description": "Name of external reference",
                                "examples": [
                                    "PubChem-compound"
                                ]
                            },
                            "ids": {
                                "type": "array",
                                "description": "List of reference identifiers",
                                "items": {
                                    "type": "string",
                                    "description": "Reference identifier",
                                    "examples": [
                                        "67505836"
                                    ]
                                }
                            },
                            "access_time": {
                                "type": "string",
                                "description": "Date and time the external reference was accessed",
                                "format": "date-time"
                            }
                        }
                    }
                },
                "platform": {
                    "type": "array",
                    "description": "reference to a particular deployment of an existing platform where this BCO can be reproduced.",
                    "items": {
                        "type": "string",
                        "examples": [
                            "hive"
                        ]
                    }
                },
                "pipeline_steps": {
                    "type": "array",
                    "description": "Each individual tool (or a well defined and reusable script) is represented as a step. Parallel processes are given the same step number.",
                    "items": {
                        "additionalProperties": false,
                        "type": "object",
                        "required": [
                            "step_number",
                            "name",
                            "description",
                            "input_list",
                            "output_list"
                        ],
                        "properties": {
                            "step_number": {
                                "type": "integer",
                                "description": "Non-negative integer value representing the position of the tool in a one-dimensional representation of the pipeline."
                            },
                            "name": {
                                "type": "string",
                                "description": "This is the common name of the software tool",
                                "examples": [
                                    "HIVE-hexagon"
                                ]
                            },
                            "description": {
                                "type": "string",
                                "description": "Specific purpose of the tool.",
                                "examples": [
                                    "Alignment of reads to a set of references"
                                ]
                            },
                            "version": {
                                "type": "string",
                                "description": "Version assigned to the instance of the tool used.",
                                "examples": [
                                    "1.3"
                                ]
                            },
                            "prerequisite": {
                                "type": "array",
                                "description": "Reference or required prereqs",
                                "items": {
                                    "type": "object",
                                    "description": "Text value to indicate a package or prerequisite for running the tool used.",
                                    "required": [
                                        "name",
                                        "uri"
                                    ],
                                    "properties": {
                                        "name": {
                                            "type": "string",
                                            "description": "Public searchable name for reference or prereq.",
                                            "examples": [
                                                "Hepatitis C virus genotype 1"
                                            ]
                                        },
                                        "uri": {
                                            "type": "object",
                                            "description": "A Uniform Resource Identifer",
                                            "additionalProperties": false,
                                            "required": [
                                                "uri"
                                            ],
                                            "properties": {
                                                "filename": {
                                                    "type": "string"
                                                },
                                                "uri": {
                                                    "type": "string",
                                                    "format": "uri"
                                                },
                                                "access_time": {
                                                    "type": "string",
                                                    "format": "date-time"
                                                },
                                                "sha1_checksum": {
                                                    "type": "string",
                                                    "description": "value of sha1 checksum of file",
                                                    "pattern": "[A-Za-z0-9]+"
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "input_list": {
                                "type": "array",
                                "description": "URIs (expressed as a URN or URL) of the input files for each tool.",
                                "items": {
                                    "type": "object",
                                    "description": "A Uniform Resource Identifer",
                                    "additionalProperties": false,
                                    "required": [
                                        "uri"
                                    ],
                                    "properties": {
                                        "filename": {
                                            "type": "string"
                                        },
                                        "uri": {
                                            "type": "string",
                                            "format": "uri"
                                        },
                                        "access_time": {
                                            "type": "string",
                                            "format": "date-time"
                                        },
                                        "sha1_checksum": {
                                            "type": "string",
                                            "description": "value of sha1 checksum of file",
                                            "pattern": "[A-Za-z0-9]+"
                                        }
                                    }
                                }
                            },
                            "output_list": {
                                "type": "array",
                                "description": "URIs (expressed as a URN or URL) of the output files for each tool.",
                                "items": {
                                    "type": "object",
                                    "description": "A Uniform Resource Identifer",
                                    "additionalProperties": false,
                                    "required": [
                                        "uri"
                                    ],
                                    "properties": {
                                        "filename": {
                                            "type": "string"
                                        },
                                        "uri": {
                                            "type": "string",
                                            "format": "uri"
                                        },
                                        "access_time": {
                                            "type": "string",
                                            "format": "date-time"
                                        },
                                        "sha1_checksum": {
                                            "type": "string",
                                            "description": "value of sha1 checksum of file",
                                            "pattern": "[A-Za-z0-9]+"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "execution_domain": {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "$id": "http://www.w3id.org/biocompute/1.3.0/schemas/execution_domain.json",
            "type": "object",
            "title": "Execution Domain",
            "description": "The fields required for execution of the BCO are herein encapsulated together in order to clearly separate information needed for deployment, software configuration, and running applications in a dependent environment",
            "required": [
                "script",
                "script_driver",
                "software_prerequisites",
                "external_data_endpoints",
                "environment_variables"
            ],
            "additionalProperties": false,
            "properties": {
                "script": {
                    "type": "array",
                    "description": "points to internal or external references to a script object that was used to perform computations for this BCO instance.",
                    "items": {
                        "additionalProperties": false,
                        "properties": {
                            "uri": {
                                "type": "object",
                                "description": "A Uniform Resource Identifer",
                                "additionalProperties": false,
                                "required": [
                                    "uri"
                                ],
                                "properties": {
                                    "filename": {
                                        "type": "string"
                                    },
                                    "uri": {
                                        "type": "string",
                                        "format": "uri"
                                    },
                                    "access_time": {
                                        "type": "string",
                                        "format": "date-time"
                                    },
                                    "sha1_checksum": {
                                        "type": "string",
                                        "description": "value of sha1 checksum of file",
                                        "pattern": "[A-Za-z0-9]+"
                                    }
                                }
                            }
                        }
                    }
                },
                "script_driver": {
                    "type": "string",
                    "description": "Specification of the kind of executable that can be launched in order to perform a sequence of commands described in the script in order to run the pipelin",
                    "examples": [
                        "hive",
                        "cwl-runner",
                        "shell"
                    ]
                },
                "software_prerequisites": {
                    "type": "array",
                    "description": "Minimal necessary prerequisites, library, tool versions needed to successfully run the script to produce BCO.",
                    "items": {
                        "type": "object",
                        "description": "A necessary prerequisite, library, or tool version.",
                        "required": [
                            "name",
                            "version",
                            "uri"
                        ],
                        "additionalProperties": false,
                        "properties": {
                            "name": {
                                "type": "string",
                                "description": "Names of software prerequisites",
                                "examples": [
                                    "HIVE-hexagon"
                                ]
                            },
                            "version": {
                                "type": "string",
                                "description": "Versions of the software prerequisites",
                                "examples": [
                                    "babajanian.1"
                                ]
                            },
                            "uri": {
                                "type": "object",
                                "description": "A Uniform Resource Identifer",
                                "additionalProperties": false,
                                "required": [
                                    "uri"
                                ],
                                "properties": {
                                    "filename": {
                                        "type": "string"
                                    },
                                    "uri": {
                                        "type": "string",
                                        "format": "uri"
                                    },
                                    "access_time": {
                                        "type": "string",
                                        "format": "date-time"
                                    },
                                    "sha1_checksum": {
                                        "type": "string",
                                        "description": "value of sha1 checksum of file",
                                        "pattern": "[A-Za-z0-9]+"
                                    }
                                }
                            }
                        }
                    }
                },
                "external_data_endpoints": {
                    "type": "array",
                    "description": "Minimal necessary domain-specific external data source access in order to successfully run the script to produce BCO.",
                    "items": {
                        "type": "object",
                        "description": "Requirement for network protocol endpoints used by a pipeline’s scripts, or other software.",
                        "required": [
                            "name",
                            "url"
                        ],
                        "additionalProperties": false,
                        "properties": {
                            "name": {
                                "type": "string",
                                "description": "Description of the service that is accessed",
                                "examples": [
                                    "HIVE",
                                    "access to e-utils"
                                ]
                            },
                            "url": {
                                "type": "string",
                                "description": "The endpoint to be accessed.",
                                "examples": [
                                    "https://hive.biochemistry.gwu.edu/dna.cgi?cmd=login"
                                ]
                            }
                        }
                    }
                },
                "environment_variables": {
                    "type": "object",
                    "description": "Environmental parameters that are useful to configure the execution environment on the target platform.",
                    "additionalProperties": false,
                    "patternProperties": {
                        "^[a-zA-Z_]+[a-zA-Z0-9_]*$": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "parametric_domain": {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "$id": "http://www.w3id.org/biocompute/1.3.0/schemas/parametric_domain",
            "type": "array",
            "title": "Parametric Domain",
            "description": "This represents the list of NON-default parameters customizing the computational flow which can affect the output of the calculations. These fields can be custom to each kind of analysis and are tied to a particular pipeline implementation",
            "items":{
                "required": [
                    "param",
                    "value",
                    "step"
                ],
                "additionalProperties": false,
                "properties": {
                    "param": {
                        "type": "string",
                        "title": "param",
                        "description": "Specific variables for the computational workflow",
                        "examples": [
                            "seed"
                        ],
                        "pattern": "^(.*)$"
                    },
                    "value": {
                        "type": "string",
                        "description": "Specific (non-default) parameter values for the computational workflow",
                        "title": "value",
                        "examples": [
                            "14"
                        ],
                        "pattern": "^(.*)$"
                    },
                    "step": {
                        "type": "string",
                        "title": "step",
                        "description": "Refers to the specific step of the workflow relevant to the parameters specified in 'param' and 'value'",
                        "examples": [
                            "1"
                        ],
                        "pattern": "^(.*)$"
                    }
                }
            }
        },
        "io_domain": {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "$id": "http://www.w3id.org/biocompute/1.3.0/schemas/io_domain.json",
            "type": "object",
            "title": "Input and Output Domain",
            "description": "The list of global input and output files created by the computational workflow, excluding the intermediate files. Custom to every specific BCO implementation, these fields are pointers to objects that can reside in the system performing the computation or any other accessible system.",
            "required": [
                "input_subdomain",
                "output_subdomain"
            ],
            "properties": {
                "input_subdomain": {
                    "type": "array",
                    "title": "input_domain",
                    "description": "A record of the references and input files for the entire pipeline. Each type of input file is listed under a key for that type.",
                    "items": {
                        "additionalProperties": false,
                        "type": "object",
                        "required": [
                            "uri"
                        ],
                        "properties": {
                            "uri": {
                                "type": "object",
                                "description": "A Uniform Resource Identifer",
                                "additionalProperties": false,
                                "required": [
                                    "uri"
                                ],
                                "properties": {
                                    "filename": {
                                        "type": "string"
                                    },
                                    "uri": {
                                        "type": "string",
                                        "format": "uri"
                                    },
                                    "access_time": {
                                        "type": "string",
                                        "format": "date-time"
                                    },
                                    "sha1_checksum": {
                                        "type": "string",
                                        "description": "value of sha1 checksum of file",
                                        "pattern": "[A-Za-z0-9]+"
                                    }
                                }
                            }
                        }
                    }
                },
                "output_subdomain": {
                    "type": "array",
                    "title": "output_subdomain",
                    "description": "A record of the outputs for the entire pipeline.",
                    "items": {
                        "type": "object",
                        "title": "The Items Schema",
                        "required": [
                            "mediatype",
                            "uri"
                        ],
                        "properties": {
                            "mediatype": {
                                "type": "string",
                                "title": "mediatype",
                                "description": "https://www.iana.org/assignments/media-types/",
                                "examples": [
                                    "text/csv"
                                ],
                                "pattern": "^(.*)$"
                            },
                            "uri": {
                                "type": "object",
                                "description": "A Uniform Resource Identifer",
                                "additionalProperties": false,
                                "required": [
                                    "uri"
                                ],
                                "properties": {
                                    "filename": {
                                        "type": "string"
                                    },
                                    "uri": {
                                        "type": "string",
                                        "format": "uri"
                                    },
                                    "access_time": {
                                        "type": "string",
                                        "format": "date-time"
                                    },
                                    "sha1_checksum": {
                                        "type": "string",
                                        "description": "value of sha1 checksum of file",
                                        "pattern": "[A-Za-z0-9]+"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "error_domain": {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "$id": "http://www.w3id.org/biocompute/1.3.0/schemas/error_domain.json",
            "type": "object",
            "title": "Error Domain",
            "description": "",
            "required": [
                "empirical_error",
                "algorithmic_error"
            ],
            "properties": {
                "empirical_error": {
                    "type": "object",
                    "title": "Empirical Error",
                    "description": "empirically determined values such as limits of detectability, false positives, false negatives, statistical confidence of outcomes, etc. This can be measured by running the algorithm on multiple data samples of the usability domain or through the use of carefully designed in-silico data."
                },
                "algorithmic_error": {
                    "type": "object",
                    "title": "Algorithmic Error",
                    "description": "descriptive of errors that originate by fuzziness of the algorithms, driven by stochastic processes, in dynamically parallelized multi-threaded executions, or in machine learning methodologies where the state of the machine can affect the outcome."
                }
            }

        }
    }
}